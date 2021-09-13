import axios from 'axios';
var stripe = Stripe(
  'pk_test_51JYy3dKZa62lb5TUBPizQQ4xjWC9pinbc0UgtA4gw08MccN3duIbZs6NvF3TUnY01IYP6pRJCzUm355HGiBbc1Ys00pzmqoOMb'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from APIs
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
