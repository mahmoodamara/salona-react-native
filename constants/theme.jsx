import { Dimensions } from "react-native";
import React, { useState, useEffect } from "react";

const { width, heigth } = Dimensions.get("screen");

export const COLORS = {
  primary: "#0e5198",
  title: "#0e5198",
};

export const SIZES = {
  h1: 22,
  h2: 20,
  h3: 18,
  h4: 16,
  h5: 14,
  h6: 12,
  width,
  heigth,
};

