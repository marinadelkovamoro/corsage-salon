INSERT INTO categories
    (name, createdAt, updatedAt)
VALUES
    ("Wedding Gowns", "2019-07-09 14:18:00", "2019-07-09 14:18:00"),
    ("Accessories", "2019-07-09 14:18:00", "2019-07-09 14:18:00");

INSERT INTO products
    (name, quantity, image, details, price, createdAt, updatedAt, CategoryId)
VALUES
    ("CELESTE Ball Gown", 10, "/images/dresses/ball.jpg", "Luxurious lace combined with organza and tulle create this alluring Ball gown with sweetheart neckline, long sheer sleeves, illusion back and semi-Cathedral train.", 5000, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 1),
    ("ESTELLE Mermaid Gown", 10, "/images/dresses/mermaid.jpg", "Decadent lace and feathers are the focal point of this stunning fit n flare gown with long sheer lace sleeves, ornate illlusion back with lace accents and sweep feather train.", 6000, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 1),
    ("CLOE Princess Gown", 10, "/images/dresses/princess.jpg", "Three dimensional flowers and lace adorn this romantic off the shoulder organza Ball gown featuring a luxurious semi Cathedral train.", 7000, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 1),
    ("MAIA Sheath V-Neck Gown", 10, "/images/dresses/vneck.jpg", "This stunning, sleeveless, lace sheath gown is wrapped in a striking chapel train with flowing edges and features a V-neckline with sheer accents and dramatic low back.", 5000, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 1);

INSERT INTO products
    (name, quantity, image, details, price, createdAt, updatedAt, CategoryId)
VALUES
    ("Lace Robe", 10, "/images/accessories/robes/lace.jpg", "Lace robe", 250, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 2),
    ("Silk Robe", 10, "/images/accessories/robes/silk.jpg", "Silk robe", 250, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 2),
    ("Open-toe Shoes", 10, "/images/accessories/shoes/opentoe.jpg", "Open-toe golden shoes", 1500, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 2),
    ("Point-toe Shoes", 10, "/images/accessories/shoes/pointtoe.jpg", "Point-toe silver shoes", 2000, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 2),
    ("Queen Tiara", 10, "/images/accessories/tiaras/queen.jpg", "Beautiful hand-made tiara", 1000, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 2),
    ("Princess Tiara", 10, "/images/accessories/tiaras/princess.jpg", "Beautiful hand-made tiara", 1000, "2019-07-09 14:18:00", "2019-07-09 14:18:00", 2);