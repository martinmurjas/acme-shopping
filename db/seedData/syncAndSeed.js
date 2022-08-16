const { conn, User, Product, CreditCard, Category, Genre } = require("../");
const { USERS } = require("./seedDataUsers");
const { CATEGORIES } = require("./seedDataCategories");

const { GENRES } = require("./seedDataGenres");

const syncAndSeed = async () => {
  try {
    await conn.sync({ force: true });

    await User.create({
      firstName: "Lucy",
      lastName: "Bar",
      email: "lucy_bar@gmail.com",
      password: "lucy_pw",
      phone: "123-456-7890",
      userType: "admin",
    });
    const createdUsers = await Promise.all(
      USERS.map((user) => User.create(user))
    );
    await CreditCard.create({
      nameOnCard: "Moe Foo",
      number: "1234123412341234",
      expirationMonth: 4,
      expirationYear: 25,
      pin: 573,
      userId: createdUsers[3].id,
    });

    const [teeShirts, hoodies, albums, hats, posters, accessories] =
      await Promise.all(
        CATEGORIES.map((category) => Category.create({ name: category }))
      );

    const [rock, pop, hipHop, country, electronic, metal, rAndB] =
      await Promise.all(GENRES.map((genre) => Genre.create({ name: genre })));

    await Product.create({
      name: "test",
      cost: 5.99,
      categoryId: teeShirts.id,
      genreId: rock.id,
    });
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { syncAndSeed };
