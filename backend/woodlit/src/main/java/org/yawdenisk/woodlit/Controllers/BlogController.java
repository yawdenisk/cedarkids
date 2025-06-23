package org.yawdenisk.woodlit.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.yawdenisk.woodlit.Entites.Blog;
import org.yawdenisk.woodlit.Services.BlogService;
import software.amazon.awssdk.services.s3.S3Client;

import java.util.List;

@RestController
@RequestMapping("/api/blog")
public class BlogController {
    @Autowired
    private BlogService blogService;
    @Autowired
    private S3Client s3Client;
    @PostMapping("/upload")
    public ResponseEntity<String> uploadBlog(@RequestParam String title,
                                             @RequestParam String shortDescription,
                                             @RequestParam String description,
                                             @RequestParam MultipartFile image) {
        try{
            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            s3Client.putObject(request -> request.bucket("woodlit").key(fileName), software.amazon.awssdk.core.sync.RequestBody.fromBytes(image.getBytes()));
            String imageUrl = "https://woodlit.s3.amazonaws.com/" + fileName;
            Blog blog = new Blog();
            blog.setTitle(title);
            blog.setShortDescription(shortDescription);
            blog.setDescription(description);
            blog.setImage(imageUrl);
            blogService.upload(blog);
            return ResponseEntity.ok().body("Blog uploaded");
        }catch(Exception e) {
            return ResponseEntity.status(500).body("Error uploading blog");
        }
    }
    @GetMapping("/getAll")
    public List<Blog> getAllBlogs() {
        return blogService.getAll();
    }
}
