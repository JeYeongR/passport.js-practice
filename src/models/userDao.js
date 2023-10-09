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

const findBySNS = async (snsType, snsId) => {
  const [user] = await myDataSource.query(
    `
    SELECT 
      *
    FROM 
      users
    WHERE 
      sns_type = ?
    AND
      sns_id = ?
    `,
    [snsType, snsId]
  );

  return user;
};

const createUserBySNS = async (email, snsType, snsId) => {
  return await myDataSource.query(
    `
    INSERT INTO users (
      email,
      sns_type,
      sns_id 
    ) VALUES (?, ?, ?)
    `,
    [email, snsType, snsId]
  );
};

module.exports = {
  createUser,
  findUserByEmail,
  findById,
  findBySNS,
  createUserBySNS,
};
