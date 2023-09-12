INSERT INTO tag (id, name)
VALUES
    (1, 'Strategy'),
    (2, 'Card Games'),
    (3, 'Cooperative'),
    (4, 'Family-Friendly'),
    (5, 'Role-Playing'),
    (6, 'Classic');

INSERT INTO game (id, title, description, publicationDate, price, imageIds)
VALUES
    (1, 'Catan', 'Catan is a multiplayer board game in which players assume the roles of settlers, each attempting to build and develop holdings while trading and acquiring resources.', '1995-10-01', 49.99, '1,2'),
    (2, 'Pandemic', 'Pandemic is a cooperative board game in which players work as a team to treat infections around the world while gathering resources for cures.', '2008-01-01', 39.99, '1,2'),
    (3, 'Magic: The Gathering', 'Magic: The Gathering is a collectible and digital collectible card game created by Richard Garfield.', '1993-08-01', 19.99, '1,2'),
    (4, 'Dungeons & Dragons', 'Dungeons & Dragons is a fantasy tabletop role-playing game originally designed by Gary Gygax and Dave Arneson.', '1974-01-01', 29.99, '1,2');

INSERT INTO game_tags_tag (gameId, tagId)
VALUES
    (1, 1),
    (1, 4),
    (2, 3),
    (2, 4),
    (3, 2),
    (3, 5),
    (4, 2),
    (4, 6);

INSERT INTO component (id, name, quantity, gameId)
VALUES
    (1, 'Board', 1, 1),
    (2, 'Cards', 1, 1),
    (3, 'Board', 1, 2),
    (4, 'Cards', 1, 2),
    (5, 'Cards', 1, 3),
    (6, 'Dice', 1, 4);

INSERT INTO image_entity (id, filename, mimeType)
VALUES
    (1, 'catan.jpg', 'image/jpeg'),
    (2, 'pandemic.jpg', 'image/jpeg'),
    (3, 'magic.jpg', 'image/jpeg'),
    (4, 'dnd.jpg', 'image/jpeg');

INSERT INTO information (id, address, phoneNumber, email)
VALUES
    (1, '123 Main St, Anytown, USA', '555-555-5555')

INSERT INTO user (id, username, password, email, phoneNumber, role, isActive)
VALUES
    (1, 'admin', '$2b$12$4zs39HEa299ZC0HcSQlEIeaVGcjSaiIAjOLb1Y7E6vK1rxrc/Wb5.', 'admin@gmail.com', '555-555-555', 'ADMIN', true),
    (2, 'user', '$2b$12$4zs39HEa299ZC0HcSQlEIeaVGcjSaiIAjOLb1Y7E6vK1rxrc/Wb5.', 'user@gmai.com', '444-444-444', 'USER', true),
    (3, 'inactive', '$2b$12$4zs39HEa299ZC0HcSQlEIeaVGcjSaiIAjOLb1Y7E6vK1rxrc/Wb5.', 'user2@gmai.com', '444-444-445', 'USER', false),
    (4, 'employee', '$2b$12$4zs39HEa299ZC0HcSQlEIeaVGcjSaiIAjOLb1Y7E6vK1rxrc/Wb5.', 'employee@gmail.com', '555-555-554', 'EMPLOYEE', true);

INSERT INTO box (id, status, priority, name, description, notes, imageIds, type)
VALUES
    (1, 'TODO', 'C', 'catanBox', 'catan box desc', 'catan box notes', '1,2', 'box'),
    (2, 'TODO', 'C', 'pandemicBox', 'pandemic box desc', 'pandemic box notes', '1,2', 'box'),
    (3, 'TODO', 'C', 'magicBox', 'magic box desc', 'magic box notes', '1,2', 'box'),
    (4, 'TODO', 'C', 'dndBox', 'dnd box desc', 'dnd box notes', '1,2', 'box');