import styled from "styled-components"
import Announcment from "../components/annoucment"
import Navbar from "../components/Navbar"
import Footer from "../components/footer"
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from 'react-stripe-checkout';
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../requestMerthod";
import { updateQuantity, removeProduct } from "../redux/cartRedux";

const key = process.env.REACT_APP_STRIPE;

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  object-fit: contain;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const RemoveItemButton = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ff6b6b;
  background: transparent;
  color: #ff6b6b;
  cursor: pointer;
`;

const EmptyState = styled.div`
  padding: 26px;
  border: 1px dashed #ccc;
  border-radius: 12px;
  text-align: center;
  color: #666;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

const Cart = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemsCount = useMemo(
    () => cart.products.reduce((sum, p) => sum + p.quantity, 0),
    [cart.products]
  );

  const subtotal = useMemo(
    () => cart.products.reduce((sum, p) => sum + (Number(p.price) || 0) * p.quantity, 0),
    [cart.products]
  );

  const onToken = (token) => {
    setStripeToken(token);
  };

  const handleQuantityChange = (product, type) => {
    dispatch(
      updateQuantity({
        id: product._id,
        color: product.color,
        size: product.size,
        type,
      })
    );
  };

  const handleRemoveProduct = (product) => {
    dispatch(
      removeProduct({
        id: product._id,
        color: product.color,
        size: product.size,
      })
    );
  };

  const formatPrice = (value) => Number(value || 0).toFixed(2);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: Math.round(subtotal * 100),
        });
        navigate("/success", {
          state: {
            stripeData: res.data,
            products: cart,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (stripeToken && subtotal > 0) makeRequest();
  }, [stripeToken, subtotal, cart, navigate]);

  return (
    <Container>
      <Navbar />
      <Announcment />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({itemsCount})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.length === 0 && <EmptyState>Your cart is empty.</EmptyState>}
            {cart.products.map((product) => (
              <Product key={`${product._id}-${product.color || "default"}-${product.size || "default"}`}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add style={{ cursor: "pointer" }} onClick={() => handleQuantityChange(product, "inc")} />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove style={{ cursor: "pointer" }} onClick={() => handleQuantityChange(product, "dec")} />
                  </ProductAmountContainer>
                  <ProductPrice>$ {formatPrice((Number(product.price) || 0) * product.quantity)}</ProductPrice>
                  <RemoveItemButton onClick={() => handleRemoveProduct(product)}>
                    Remove item
                  </RemoveItemButton>
                </PriceDetail>
              </Product>
            ))}
            {cart.products.length > 0 && <Hr />}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {formatPrice(subtotal)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ --</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ --</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {formatPrice(subtotal)}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="THIEF'S STORE"
              image="vite.svg"
              description={`your Total is ${formatPrice(subtotal)}`}
              billingAddress
              shippingAddress
              amount={Math.round(subtotal * 100)}
              token={onToken}
              stripeKey={key}
            >
              <Button disabled={!cart.products.length}>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
