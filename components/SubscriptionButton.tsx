"use client";
import React from "react";
import { Button } from "./ui/button";
import axios from "axios";
import styles from "@/Home.module.css";
import { CircleDollarSign } from 'lucide-react';

type Props = { isPro: boolean };

const SubscriptionButton = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const handleSubscription = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button disabled={loading} onClick={handleSubscription} variant="outline" className={`${styles.buttonHoverEffect}`}>
      {props.isPro ? "Donate   " : "Donate  "}<CircleDollarSign className="ml-1"/>
    </Button>
  );
};

export default SubscriptionButton;
