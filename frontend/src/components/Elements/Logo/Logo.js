function Logo({ user }) {
  if (user) {
    return <h1>About | Logo </h1>;
  } else {
    return <h1>Logo</h1>;
  }
}

export default Logo;
