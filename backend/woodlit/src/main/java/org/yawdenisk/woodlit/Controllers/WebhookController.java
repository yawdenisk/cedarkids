//package org.yawdenisk.woodlit.Controllers;
//
//import com.stripe.exception.SignatureVerificationException;
//import com.stripe.model.Event;
//import com.stripe.net.Webhook;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.web.bind.annotation.*;
//
//import javax.servlet.http.HttpServletRequest;
//
//@RestController
//@RequestMapping("/webhook")
//public class WebhookController {
//
//    @Value("${stripe.webhook.secret}")
//    private String webhookSecret;
//
//    @PostMapping
//    public String handleWebhook(HttpServletRequest request) {
//        String payload = getPayload(request);
//        String sigHeader = request.getHeader("Stripe-Signature");
//
//        try {
//            // Проверка подписи для безопасности
//            Event event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
//
//            // Обработка события
//            if ("checkout.session.completed".equals(event.getType())) {
//                // Это событие будет, когда платеж завершен
//                handlePaymentSuccess(event);
//            }
//
//            return "Success";
//
//        } catch (SignatureVerificationException e) {
//            // Если подпись не совпадает, то выбрасывается исключение
//            return "Webhook signature verification failed.";
//        } catch (Exception e) {
//            // Обработка других ошибок
//            return "Error processing webhook.";
//        }
//    }
//
//    // Метод для получения тела запроса
//    private String getPayload(HttpServletRequest request) {
//        StringBuilder payload = new StringBuilder();
//        try {
//            request.getReader().lines().forEach(payload::append);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return payload.toString();
//    }
//
//    private void handlePaymentSuccess(Event event) {
//        // Извлекаем информацию о платеже из события
//        String sessionId = event.getData().getObject().getString("id");
//        System.out.println("Payment succeeded for session ID: " + sessionId);
//
//        // Можете обработать успешную оплату: например, обновить статус заказа в базе данных
//    }
//}
