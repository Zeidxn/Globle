import { Country } from "@/scripts/interfaces";

export function getColorByDistanceBetweenCountry(
  country0: Country,
  country1: Country
): string {
  const R = 6371;
  const dLat = deg2rad(country1.latitude - country0.latitude);
  const dLon = deg2rad(country1.longitude - country0.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(country0.latitude)) *
      Math.cos(deg2rad(country1.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  const color = getColorByDistance(distance);

  return color;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

function getColorByDistance(distance: number): string {
  if (distance === 0) {
    return "rgb(0, 0, 255)";
  }

  // VERT
  if (distance < 250) {
    return "rgb(0, 255, 0)";
  }

  if (distance < 500) {
    return "rgb(0, 204, 0)";
  }

  if (distance < 1000) {
    return "rgb(0, 153, 0)";
  }

  if (distance < 2500) {
    return "rgb(153, 153, 0)";
  }

  // ORANGE
  if (distance < 5000) {
    return "rgb(255, 153, 51)";
  }

  if (distance < 7500) {
    return "rgb(255, 128, 0)";
  }

  if (distance < 10000) {
    return "rgb(204, 102, 0)";
  }

  if (distance < 12500) {
    return "rgb(153, 76, 0)";
  }

  // ROUGE
  if (distance < 15000) {
    return "rgb(255, 51, 51)";
  }

  if (distance < 17500) {
    return "rgb(255, 0, 0)";
  }

  if (distance < 20000) {
    return "rgb(204, 0, 0)";
  }

  return "rgb(153, 0, 0)";
}
