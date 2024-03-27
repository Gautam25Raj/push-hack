const pubkeyMinify = (pubkey) => {
  return (
    pubkey?.substr(0, 6) +
    "..." +
    pubkey?.substr(pubkey?.length - 5, pubkey?.length)
  );
};

export default pubkeyMinify;
