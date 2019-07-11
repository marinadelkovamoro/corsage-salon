
USE exampledb;
INSERT INTO categories
    (name, createdAt, updatedAt)
VALUES
    ("wedding gowns", "2019-07-09 14:18:00", "2019-07-09 14:18:00"),
    ("accessories", "2019-07-09 14:18:00", "2019-07-09 14:18:00");

INSERT INTO products
    (name, quantity, image, details, price, createdAt, updatedAt, CategoryId)
VALUES
    ("Ball Gown", 10, "/images/dresses/ball.jpg", "Gorgeous hand-made Ball gown", 5000, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 1),
    ("Mermaid Gown", 10, "/images/dresses/mermaid.jpg", "Gorgeous hand-made Mermaid gown", 6000, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 1),
    ("Princess Gown", 10, "/images/dresses/princess.jpg", "Gorgeous hand-made Princess gown", 7000, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 1),
    ("V-Neck Gown", 10, "/images/dresses/vneck.jpg", "Gorgeous hand-made V-neck gown", 5000, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 1);

INSERT INTO products
    (name, quantity, image, details, price, createdAt, updatedAt, CategoryId)
VALUES
    ("Lace Robe", 10, "/images/accessories/robes/lace.jpg", "Lace robe", 250, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 2),
    ("Silk Robe", 10, "/images/accessories/robes/silk.jpg", "Silk robe", 250, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 2),
    ("Open-toe Shoes", 10, "/images/accessories/shoes/opentoe.jpg", "Open-toe golden shoes", 1500, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 2),
    ("Point-toe Shoes", 10, "/images/accessories/shoes/pointtoe.jpg", "Point-toe silver shoes", 2000, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 2),
    ("Queen Tiara", 10, "/images/accessories/tiaras/queen.jpg", "Beautiful hand-made tiara", 1000, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 2),
    ("Princess Tiara", 10, "/images/accessories/tiaras/princess.jpg", "Beautiful hand-made tiara", 1000, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 2);