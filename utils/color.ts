export function getRandomDarkColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  // Check if the generated color is too bright, if so, darken it
  const brightness =
    ((parseInt(color, 16) >> 16) & 0xff) * 0.299 +
    ((parseInt(color, 16) >> 8) & 0xff) * 0.587 +
    (parseInt(color, 16) & 0xff) * 0.114;

  if (brightness > 200) {
    color = darkenColor(color);
  }

  return color;
}

function darkenColor(color) {
  // Darkening the color by reducing its brightness
  const amount = 20; // Adjust this value for the darkness level
  return (
    '#' +
    color
      .match(/[0-9a-f]{2}/gi)
      .map(function (v) {
        return (
          '0' +
          Math.max(0, Math.min(255, parseInt(v, 16) - amount)).toString(16)
        ).slice(-2);
      })
      .join('')
  );
}
