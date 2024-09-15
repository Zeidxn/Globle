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
    return "rgb(8,41,8)";
  }

  if (distance < 1000) {
    return "rgb(0,76,0)";
  }

  if (distance < 1250) {
    return "rgb(0,131,0)";
  }

  if (distance < 1500) {
    return "rgb(0,149,0)";
  }

  if (distance < 2250) {
    return "rgb(31,197,31)";
  }
  if (distance < 2500) {
    return "rgb(91,193,13)";
  }

  if (distance < 2500) {
    return "rgb(110,198,41)";
  }

  if (distance < 3000) {
    return "rgb(141,228,29)";
  }

  if (distance < 4000) {
    return "rgb(187,255,109)";
  }

  if (distance < 6500) {
    return "rgb(255,251,76)";
  }

  if (distance < 7000) {
    return "rgb(255,159,95)";
  }

  if (distance < 8500) {
    return "rgb(255,103,0)";
  }

  if (distance < 10000) {
    return "rgb(255,69,69)";
  }

  return "rgb(255, 0, 0)";
}
