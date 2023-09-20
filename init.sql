INSERT INTO tag (id, name)
VALUES
    (1, 'Strategy'),
    (2, 'Card Games'),
    (3, 'Cooperative'),
    (4, 'Family-Friendly'),
    (5, 'Role-Playing'),
    (6, 'Classic');

ALTER TABLE tag AUTO_INCREMENT = 7;

INSERT INTO game (id, title, description, "publicationDate", price, "imageIds")
VALUES
    (1, 'Catan', 'Catan is a multiplayer board game in which players assume the roles of settlers, each attempting to build and develop holdings while trading and acquiring resources.', '1995-10-01', 49.99, '{1,2}'),
    (2, 'Pandemic', 'Pandemic is a cooperative board game in which players work as a team to treat infections around the world while gathering resources for cures.', '2008-01-01', 39.99, '{1,2}'),
    (3, 'Magic: The Gathering', 'Magic: The Gathering is a collectible and digital collectible card game created by Richard Garfield.', '1993-08-01', 19.99, '{1,2}'),
    (4, 'Dungeons & Dragons', 'Dungeons & Dragons is a fantasy tabletop role-playing game originally designed by Gary Gygax and Dave Arneson.', '1974-01-01', 29.99, '{1,2}');

ALTER TABLE game AUTO_INCREMENT = 5;

INSERT INTO game_tags_tag ("gameId", "tagId")
VALUES
    (1, 1),
    (1, 4),
    (2, 3),
    (2, 4),
    (3, 2),
    (3, 5),
    (4, 2),
    (4, 6);

INSERT INTO component (id, name, quantity, "gameId")
VALUES
    (1, 'Board', 1, 1),
    (2, 'Cards', 1, 1),
    (3, 'Board', 1, 2),
    (4, 'Cards', 1, 2),
    (5, 'Cards', 1, 3),
    (6, 'Dice', 1, 4);

ALTER  TABLE component AUTO_INCREMENT = 7;

INSERT INTO image_entity (id, filename, mimeType)
VALUES
    (1, '12dcdbbdb8e2919fbffc55c146192407', 'image/jpeg'),
    (2, '0336d96ae8579689cfbcfae01b363456', 'image/jpeg'),
    (3, '104a6664ff1c36442922c8754d1ccf75', 'image/jpeg'),
    (4, 'c121e17775623d358a6cec2410be7779', 'image/jpeg');

ALTER TABLE image_entity AUTO_INCREMENT = 5;

INSERT INTO "user" (id, username, password, email, "phoneNumber", role, "isActive")
VALUES
    (1, 'admin', '$2b$12$4zs39HEa299ZC0HcSQlEIeaVGcjSaiIAjOLb1Y7E6vK1rxrc/Wb5.', 'admin@gmail.com', '555555555', 'admin', true),
    (2, 'user', '$2b$12$4zs39HEa299ZC0HcSQlEIeaVGcjSaiIAjOLb1Y7E6vK1rxrc/Wb5.', 'user@gmai.com', '444444444', 'user', true),
    (3, 'inactive', '$2b$12$4zs39HEa299ZC0HcSQlEIeaVGcjSaiIAjOLb1Y7E6vK1rxrc/Wb5.', 'user2@gmai.com', '444444445', 'user', false),
    (4, 'employee', '$2b$12$4zs39HEa299ZC0HcSQlEIeaVGcjSaiIAjOLb1Y7E6vK1rxrc/Wb5.', 'employee@gmail.com', '555555554', 'employee', true);

ALTER TABLE "user" AUTO_INCREMENT = 5;

INSERT INTO box (id, status, priority, name, description, notes, "imageIds", type)
VALUES
    (1, 'TODO', 'C', 'catanBox', 'catan box desc', '{catan box notes}', '{1,2}', 'box'),
    (2, 'TODO', 'C', 'pandemicBox', 'pandemic box desc', '{pandemic box notes}', '{1,2}', 'box'),
    (3, 'TODO', 'C', 'magicBox', 'magic box desc', '{magic box notes}', '{1,2}', 'box'),
    (4, 'TODO', 'C', 'dndBox', 'dnd box desc', '{dnd box notes}', '{1,2}', 'box');

ALTER TABLE box AUTO_INCREMENT = 5;

INSERT INTO property (id, name, value, "boxId")
VALUES
    (1, 'length', '10', 1),
    (2, 'width', '10', 1),
    (3, 'height', '10', 1),
    (4, 'length', '10', 2),
    (5, 'width', '10', 2),
    (6, 'height', '10', 2),
    (7, 'length', '10', 3),
    (8, 'width', '10', 3),
    (9, 'height', '10', 3),
    (10, 'length', '10', 4),
    (11, 'width', '10', 4),
    (12, 'height', '10', 4);

INSERT INTO project (id, name, description, "isTemplate", notes, "imageIds", "isCompleted", "boxId")
VALUES
    (1, 'catan project', 'Project for catan game', true, '{catan project notes}', '{1,2}', false, 1),
    (2, 'pandemic project', 'Project for pandemic game', true, '{pandemic project notes}', '{1,2}', false, 2),
    (3, 'magic project', 'Project for magic game', true, '{magic project notes}', '{1,2}', false, 3),
    (4, 'dnd project', 'Project for dnd game', true, '{dnd project notes}', '{1,2}', false, 4);

ALTER TABLE project AUTO_INCREMENT = 5;

INSERT INTO project_games_game ("projectId", "gameId")
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4);

INSERT INTO container (id, status, priority, name, description, notes, quantity, "imageIds", type, "projectId")
VALUES
    (1, 'TODO', 'C', 'Box 1', 'Box for cards', '{empty}', 2, '{1,2}', 'container', 1),
    (2, 'TODO', 'C', 'Box 2', 'Box for cards', '{empty}', 2, '{1,2}', 'container', 2),
    (3, 'TODO', 'C', 'Box 3', 'Box for cards', '{empty}', 2, '{1,2}', 'container', 3),
    (4, 'TODO', 'C', 'Box 4', 'Box for cards', '{empty}', 2, '{1,2}', 'container', 4);

ALTER TABLE container AUTO_INCREMENT = 5;

INSERT INTO property (id, name, value, "containerId")
VALUES
    (13, 'length', '5', 1),
    (14, 'width', '5', 1),
    (15, 'height', '5', 1),
    (16, 'length', '5', 2),
    (17, 'width', '5', 2),
    (18, 'height', '5', 2),
    (19, 'length', '5', 3),
    (20, 'width', '5', 3),
    (21, 'height', '5', 3),
    (22, 'length', '5', 4),
    (23, 'width', '5', 4),
    (24, 'height', '5', 4);

INSERT INTO element (id, status, priority, name, description, notes, quantity, "imageIds", type, "containerId")
VALUES
    (1, 'TODO', 'C', 'Cards', 'Cards for catan', '{empty}', 2, '{1,2}', 'element', 1),
    (2, 'TODO', 'C', 'Cards', 'Cards for pandemic', '{empty}', 2, '{1,2}', 'element', 2),
    (3, 'TODO', 'C', 'Cards', 'Cards for magic', '{empty}', 2, '{1,2}', 'element', 3),
    (4, 'TODO', 'C', 'Cards', 'Cards for dnd', '{empty}', 2, '{1,2}', 'element', 4);

INSERT INTO property (id, name, value, "elementId")
VALUES
    (25, 'length', '3', 1),
    (26, 'width', '3', 1),
    (27, 'height', '3', 1),
    (28, 'length', '3', 2),
    (29, 'width', '3', 2),
    (30, 'height', '3', 2),
    (31, 'length', '3', 3),
    (32, 'width', '3', 3),
    (33, 'height', '3', 3),
    (34, 'length', '3', 4),
    (35, 'width', '3', 4),
    (36, 'height', '3', 4);

INSERT INTO element (id, status, priority, name, description, notes, quantity, "imageIds", type, "projectId")
VALUES
    (5, 'TODO', 'C', 'Dice', 'Dice for game', '{empty}', 3, '{1,2}', 'element', 1),
    (6, 'TODO', 'C', 'Dice', 'Dice for game', '{empty}', 3, '{1,2}', 'element', 2),
    (7, 'TODO', 'C', 'Dice', 'Dice for game', '{empty}', 3, '{1,2}', 'element', 3),
    (8, 'TODO', 'C', 'Dice', 'Dice for game', '{empty}', 3, '{1,2}', 'element', 4);

ALTER TABLE element AUTO_INCREMENT = 9;

INSERT INTO property (id, name, value, "elementId")
VALUES
    (37, 'length', '3', 5),
    (38, 'width', '3', 5),
    (39, 'height', '3', 5),
    (40, 'length', '3', 6),
    (41, 'width', '3', 6),
    (42, 'height', '3', 6),
    (43, 'length', '3', 7),
    (44, 'width', '3', 7),
    (45, 'height', '3', 7),
    (46, 'length', '3', 8),
    (47, 'width', '3', 8),
    (48, 'height', '3', 8);

ALTER TABLE property AUTO_INCREMENT = 49;