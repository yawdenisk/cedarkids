package org.yawdenisk.woodlit.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.yawdenisk.woodlit.Entites.Product;
import org.yawdenisk.woodlit.Entites.Review;
import org.yawdenisk.woodlit.Entites.ReviewGallery;
import org.yawdenisk.woodlit.Exceptions.ProductNotFoundException;
import org.yawdenisk.woodlit.Services.ProductService;
import org.yawdenisk.woodlit.Services.ReviewService;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/review")
public class ReviewController {
    @Autowired
    private S3Client s3Client;
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private ProductService productService;

    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("fullName") String fullName,
                                         @RequestParam("text") String text,
                                         @RequestParam("rate") int rate,
                                         @RequestParam("productId") UUID productId,
                                         @RequestParam(value = "gallery", required = false) List<MultipartFile> gallery) {
        try {
            Review review = new Review();
            review.setFullName(fullName);
            review.setText(text);
            review.setRate(rate);
            Product product = productService.getProductById(productId).orElseThrow(ProductNotFoundException::new);
            review.setProduct(product);
            if (gallery != null && !gallery.isEmpty()) {
                for (MultipartFile multipartFile : gallery) {
                    String fileGalleryName = System.currentTimeMillis() + "_" + multipartFile.getOriginalFilename();
                    s3Client.putObject(request -> request.bucket("woodlit").key(fileGalleryName), RequestBody.fromBytes(multipartFile.getBytes()));
                    String imageGalleryUrl = "https://woodlit.s3.amazonaws.com/" + fileGalleryName;
                    ReviewGallery reviewGallery = new ReviewGallery();
                    reviewGallery.setImageUrl(imageGalleryUrl);
                    reviewGallery.setReview(review);
                    review.getReviewGallery().add(reviewGallery);
                }
            }
            reviewService.upload(review);
            return ResponseEntity.ok().body("Successfully uploaded");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error occured while uploading review");
        }
    }
}
