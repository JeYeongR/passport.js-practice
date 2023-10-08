const { myDataSource } = require("./dataSource");

const createUser = async (email, password) => {
  await myDataSource.query(
    `
    INSERT INTO users (
      email,
      password  
    ) VALUES (?, ?)
    `,
    [email, password]
  );
};

const findUserByEmail = async (email) => {
  const [user] = await myDataSource.query(
    `
    SELECT
      id,
      email,
      password
    FROM
      users
    WHERE
      email = ?
    limit 1
    `,
    [email]
  );

  return user;
};

const findById = async (id) => {
  const [user] = await myDataSource.query(
    `
    SELECT *
    FROM users
    WHERE id = ?
    `,
    [id]
  );

  return user;
};

module.exports = {
  createUser,
  findUserByEmail,
  findById,
};
