package org.yawdenisk.woodlit.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.yawdenisk.woodlit.Entites.Product;
import org.yawdenisk.woodlit.Entites.ProductGallery;
import org.yawdenisk.woodlit.Exceptions.ProductNotFoundException;
import org.yawdenisk.woodlit.Services.ProductService;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;

import java.util.*;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService;
    @Autowired
    private S3Client s3Client;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadProduct(@RequestParam("name") String name,
                                                @RequestParam("description") String description,
                                                @RequestParam("price") float price,
                                                @RequestParam("lastPrice") float lastPrice,
                                                @RequestParam("features") String features,
                                                @RequestParam("image") MultipartFile image,
                                                @RequestParam("gallery") List<MultipartFile> gallery) {
        try {
            if (image.isEmpty() && gallery.isEmpty()) {
                return ResponseEntity.badRequest().body("Image file and gallery is empty");
            }
            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            s3Client.putObject(request -> request.bucket("woodlit").key(fileName), RequestBody.fromBytes(image.getBytes()));
            String imageUrl = "https://woodlit.s3.amazonaws.com/" + fileName;
            Product product = new Product();
            product.setName(name);
            product.setDescription(description);
            product.setPrice(price);
            product.setLastPrice(lastPrice);
            product.setImage(imageUrl);
            product.setFeatures(features);
            for (MultipartFile multipartFile : gallery) {
                String fileGalleryName = System.currentTimeMillis() + "_" + multipartFile.getOriginalFilename();
                s3Client.putObject(request -> request.bucket("woodlit").key(fileGalleryName), RequestBody.fromBytes(multipartFile.getBytes()));
                String imageGalleryUrl = "https://woodlit.s3.amazonaws.com/" + fileGalleryName;
                ProductGallery productGallery = new ProductGallery();
                productGallery.setImageUrl(imageGalleryUrl);
                productGallery.setProduct(product);
                product.getGallery().add(productGallery);
            }
            productService.uploadProduct(product);
            return ResponseEntity.ok("Product uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error uploading product" + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable UUID id) {
        try {
            Product product = productService.getProductById(id).orElseThrow(() -> new ProductNotFoundException());
            s3Client.deleteObject(request -> request.bucket("woodlit").key(product.getImage()));
            productService.deleteProduct(id);
            return ResponseEntity.ok("Product deleted sucessfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting product");
        }
    }

    @PutMapping("update/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable UUID id,
                                                @RequestParam(required = false, name = "lastPrice") Float lastPrice,
                                                @RequestParam(required = false, name = "name") String name,
                                                @RequestParam(required = false, name = "description") String description,
                                                @RequestParam(required = false, name = "price") Float price,
                                                @RequestParam(required = false, name = "features") String features,
                                                @RequestParam(required = false, name = "image") MultipartFile image,
                                                @RequestParam(required = false, name = "gallery") List<MultipartFile> gallery) {
        try {
            Product product = productService.getProductById(id).orElseThrow(ProductNotFoundException::new);
            if (name != null) product.setName(name);
            if (description != null) product.setDescription(description);
            if (price != null) product.setPrice(price);
            if (features != null) product.setFeatures(features);
            if (features != null) product.setLastPrice(lastPrice);
            if (image != null) {
                s3Client.deleteObject(request -> request.bucket("woodlit").key(product.getImage()));
                String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                s3Client.putObject(request -> request.bucket("woodlit").key(fileName), RequestBody.fromBytes(image.getBytes()));
                String imageUrl = "https://woodlit.s3.amazonaws.com/" + fileName;
                product.setImage(imageUrl);
            }
            if(gallery != null &&   !gallery.isEmpty()){
                for (MultipartFile multipartFile : gallery) {
                    String fileGalleryName = System.currentTimeMillis() + "_" + multipartFile.getOriginalFilename();
                    s3Client.putObject(request -> request.bucket("woodlit").key(fileGalleryName), RequestBody.fromBytes(multipartFile.getBytes()));
                    String imageGalleryUrl = "https://woodlit.s3.amazonaws.com/" + fileGalleryName;
                    ProductGallery productGallery = new ProductGallery();
                    productGallery.setImageUrl(imageGalleryUrl);
                    productGallery.setProduct(product);
                    product.getGallery().add(productGallery);
                }
            }
            productService.uploadProduct(product);
            return ResponseEntity.ok("Product updated sucessfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating product" + e.getMessage());
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable UUID id) {
        Product product = productService.getProductById(id)
                .orElseThrow(ProductNotFoundException::new);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllProducts() {
        try {
            List<Product> products = productService.getAllProducts();
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error getting products");
        }
    }
}
