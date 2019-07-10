SELECT *
FROM exampledb.categories;

INSERT INTO categories
    (name, createdAt, updatedAt)
VALUES
    ("wedding gowns", "2019-07-09 14:18:00", "2019-07-09 14:18:00"),
    ("accessories", "2019-07-09 14:18:00", "2019-07-09 14:18:00");

INSERT INTO products
    (name, quantity, image, details, price, createdAt, updatedAt, CategoryId)
VALUES
    ("ball gown", 10, "/public/images/dresses/ball.jpeg", "Gorgeous hand-made Ball gown", 5000, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 1),
    ("mermaid", 10, "/public/images/dresses/mermaid.jpeg", "Gorgeous hand-made Mermaid gown", 6000, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 1),
    ("princess", 10, "/public/images/dresses/princess.jpeg", "Gorgeous hand-made Princess gown", 7000, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 1),
    ("vneck", 10, "/public/images/dresses/vneck.jpeg", "Gorgeous hand-made V-neck gown", 5000, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 1);

INSERT INTO products
    (name, quantity, image, details, price, createdAt, updatedAt, CategoryId)
VALUES
    ("lace robe", 10, "/public/images/accessories/robes/lace.jpeg", "Lace robe", 250, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 2),
    ("silk robe", 10, "/public/images/accessories/robes/silk.jpeg", "Silk robe", 250, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 2),
    ("open-toe shoes", 10, "/public/images/accessories/shoes/opentoe.jpeg", "Open-toe golden shoes", 1500, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 2),
    ("point-toe shoes", 10, "/public/images/accessories/robes/pointtoe.jpeg", "Point-toe silver shoes", 2000, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 2),
    ("queen tiara", 10, "/public/images/accessories/tiaras/queen.jpeg", "Beautiful hand-made tiara", 1000, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 2),
    ("princess tiara", 10, "/public/images/accessories/tiaras/princess.jpeg", "Beautiful hand-made tiara", 1000, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 2);