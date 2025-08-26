
export default function OrderSuccess() {
  return (
    <div className="order-success">
      <div className="card">
        <h1>Order Successfully Created</h1>
        <p>
          Thank you for your purchase! Your order has been successfully placed.
          You will receive a confirmation email shortly.
        </p>
        <a href="/" className="btn">
          Back to Home
        </a>
      </div>
    </div>
  );
}
