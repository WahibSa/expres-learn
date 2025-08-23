export const usernameController = (req, res) => {
  const { username, id } = req.params;
  res.send(`Halo ${username}, your id : ${id}`);
};

export const searchController = (req, res) => {
  // destructuring -> ambil semua query parameter -> nama variiable adalah key dari query param
  const { keyword, category } = req.query;
  res.json({
    keyword: keyword,
    category: category,
  });
};
