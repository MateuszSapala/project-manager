SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

INSERT INTO `user` (`id`, `admin`, `email`, `name`, `password`, `surname`, `username`)
VALUES (2, b'0', 'user1@gmail.com', 'Adam', /*'pass' encoded in Bcrypt*/
        '$2a$10$MeCIeIUPREtZHf8xzfbnFeUvy7vL9XBmgnsL77avzCpQetZGhrNXu', 'Nowak',
        'user1'),
       (3, b'0', 'user2@gmail.com', 'Jan', /*'pass' encoded in Bcrypt*/
        '$2a$10$dnZPVsiJtMyG81vHoDu92.YNP1vZSbhPEgv8n86EEW.Wv2BGs72K6', 'Kowalski',
        'user2'),
       (4, b'0', 'user3@gmail.com', 'Sebastian', /*'pass' encoded in Bcrypt*/
        '$2a$10$yAZ73PncTV.Qchan9BHFoOerT3YkOl5Q0CNJpYIHkiqLhZrzREzaS',
        'Lewandowski', 'user3'),
       (5, b'0', 'user4@gmail.com', 'Artur', /*'pass' encoded in Bcrypt*/
        '$2a$10$hal9EXyA80J42jkDQBh/FuFjY9aTXlh52VUb9YOFIqkDIFoLtNuwm', 'Rewicz',
        'user4'),
       (6, b'0', 'user5@gmail.com', 'Tomasz', /*'pass' encoded in Bcrypt*/
        '$2a$10$GTM.qIshnWWFjZ4sflegvu/p7N.fJjspCYeaZN5MzB3lzhsLuvfnS',
        'Kaczmarek', 'user5');

INSERT INTO `project` (`id`, `description`, `name`)
VALUES (1,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent faucibus pharetra orci, sit amet placerat felis faucibus in. Donec egestas ipsum dictum, cursus lorem id, accumsan sem. Aenean ipsum orci, dignissim vel nibh malesuada, ornare luctus ex. Vivamus congue eleifend odio eu bibendum. Quisque sit amet hendrerit dolor. Quisque sodales in urna id euismod. Fusce pellentesque vitae odio sed feugiat. Quisque consequat bibendum ligula, id dignissim risus egestas quis. Mauris interdum enim ex, sed tempus risus feugiat sit amet. Phasellus id hendrerit neque. Phasellus odio est, luctus a ex vel, facilisis fringilla felis. Phasellus id augue accumsan, lacinia arcu eu, viverra diam. Aliquam tempor consectetur fermentum. Nullam dapibus ultrices tempus. Curabitur consectetur nunc a erat consequat tincidunt. Aliquam euismod convallis lobortis.\n\nIn consequat nisl nibh, et aliquet leo accumsan sit amet. Maecenas ultrices eget nunc vehicula pulvinar. Proin tempus sem placerat, auctor dui sit amet, tincidunt lorem. Sed eget finibus mauris, id vestibulum ligula. Proin eu suscipit ipsum, ullamcorper dignissim nisl. Ut at fringilla nibh, vel aliquam est. Integer nulla ligula, pretium eu bibendum facilisis, dapibus in est. Nam vestibulum metus eu egestas pulvinar. Aenean id risus in dolor laoreet aliquet. Mauris nec elit nisl. Ut condimentum luctus mollis. Sed rutrum augue et iaculis fermentum.\n\nSuspendisse et venenatis neque. Aenean vehicula lacus sit amet risus ullamcorper interdum. Nam eget nulla ullamcorper, laoreet mauris sit amet, lacinia nulla. Donec pharetra sem id sem viverra, quis posuere turpis maximus. Fusce lacinia justo in felis malesuada, in consequat orci venenatis. Duis rutrum, est a vulputate viverra, felis sapien lobortis orci, non consectetur metus elit porta urna. Curabitur nunc sem, efficitur quis scelerisque ut, consectetur nec arcu. Cras et aliquam ante. Etiam rhoncus purus quam, id consequat sem placerat a. Maecenas ornare turpis nec nunc euismod, quis pharetra nulla accumsan. Phasellus eget turpis volutpat nibh sodales sagittis posuere in nunc. Fusce egestas purus diam, et iaculis neque elementum at.\n\nVestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras vitae mollis ante, in hendrerit elit. Maecenas vulputate auctor gravida. Sed ultricies blandit fringilla. Ut id elementum ex. Vivamus nulla tortor, vestibulum id fringilla sed, ornare at leo. Sed a imperdiet eros, ac consectetur augue. Suspendisse potenti. Donec id diam vitae diam sodales sollicitudin. Donec rutrum, purus sed dignissim consequat, dolor dui posuere mauris, egestas laoreet magna dui sed turpis. Morbi a dictum erat. Mauris viverra nunc sed justo lobortis, blandit viverra sem interdum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis egestas ultricies lacinia.\n\nVestibulum ac nunc quam. Nam in purus metus. Donec eu commodo orci. Aliquam blandit dui eget dignissim semper. Vestibulum in erat auctor, viverra dui vel, cursus odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique laoreet lectus, ut tempus sapien vehicula nec. Donec ultricies facilisis urna nec tempor. Suspendisse elementum dui quam, eu fringilla nisl malesuada a. Nulla sed consequat arcu. Quisque sem nisi, dictum ut congue at, auctor eget nibh. Proin sodales lacus ac nisi ultrices convallis. Etiam elit sapien, pulvinar sed sodales id, tempor eget quam. Quisque faucibus massa in nibh varius, sit amet porta purus tristique. Donec sodales risus mattis, tempus felis vitae, pulvinar nulla. Etiam tincidunt nisl non lacus faucibus dignissim.\n\nCurabitur quis enim sed lacus sodales efficitur. Suspendisse molestie, neque aliquam iaculis aliquam, tellus nisl auctor urna, id porttitor diam erat ut mi. Nulla facilisi. Sed at ligula at leo tincidunt mollis nec a arcu. Integer egestas mauris libero, at congue massa elementum in. Aenean porta malesuada leo, non sagittis sapien consectetur maximus. Maecenas sed dolor malesuada, pharetra arcu quis, varius diam. Integer ac urna commodo, sodales sem quis, venenatis ligula. Sed eget purus aliquet ligula tempus vehicula. Sed consectetur fringilla ultricies. Nulla vestibulum porta mi eu fringilla. Cras quis condimentum libero, et gravida mauris.',
        'Projekt-1'),
       (2,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean hendrerit suscipit purus eget scelerisque. Nullam tristique tellus in nibh varius, quis consectetur dolor posuere. Aenean eu diam ligula. Vestibulum ut bibendum est. Duis sem neque, iaculis eget massa eu, porttitor placerat leo. Nullam et vehicula turpis. Morbi hendrerit nulla a justo porttitor consequat. Curabitur tincidunt bibendum orci. Integer non interdum mi. Duis elementum eros odio, sit amet venenatis lacus congue eu. Quisque vulputate volutpat lorem ac tincidunt.\n\nDonec vel accumsan leo, ut porta nisl. Etiam nec tempor nibh, sed dignissim elit. Donec finibus dapibus tellus, sit amet ullamcorper leo finibus sed. Nunc sodales est eget libero viverra, vitae interdum nulla rhoncus. Fusce sodales justo ex, sed molestie lectus ultrices id. Nulla placerat lacus ac erat bibendum volutpat. Aenean congue, lectus at vestibulum vehicula, eros tellus pretium felis, et lacinia urna justo sit amet est. Ut euismod pellentesque metus eget luctus.\n\nIn magna massa, fermentum vitae condimentum et, rhoncus vitae ante. Suspendisse et augue non nisl suscipit faucibus in id eros. Quisque volutpat lorem neque, eget dictum velit egestas eget. Integer hendrerit ante efficitur venenatis pretium. Morbi risus ipsum, congue a congue non, pretium in tellus. Etiam tempor aliquet tellus, at fermentum ante luctus ut. Mauris purus risus, auctor eget pellentesque id, semper eget massa. Nullam imperdiet ligula varius rutrum tempus. Donec quis dolor ullamcorper, dignissim nunc at, consequat lacus. Aliquam eu arcu non dolor faucibus sodales quis id ex. Cras molestie pretium lacus eget laoreet. Integer lobortis eros nulla, in cursus lacus facilisis ut. Quisque non sapien lacinia mauris maximus consequat. Fusce sit amet mi id erat malesuada commodo fringilla in arcu.\n\nAliquam tempor pulvinar cursus. Sed erat ante, imperdiet ac sollicitudin eleifend, vestibulum eget justo. Fusce nec vestibulum libero, eget iaculis diam. Aliquam erat volutpat. Integer varius velit diam, vel porta massa congue et. Curabitur ut interdum arcu. Mauris cursus non dolor ac sodales. Etiam sapien justo, tincidunt eu nisl vel, facilisis venenatis metus. Duis velit tellus, cursus non tincidunt vel, bibendum vitae lorem. Curabitur sed odio id lorem tempor venenatis. Donec nec pharetra orci, sit amet eleifend tellus. Pellentesque mauris tellus, scelerisque sed feugiat sed, finibus varius nisl. Maecenas ac purus orci. Curabitur tempus eu urna a imperdiet.\n\nDuis aliquam maximus velit non lacinia. Cras ultricies erat justo, id convallis lectus consequat ut. Mauris convallis elementum tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam congue lectus efficitur nunc ultricies, sit amet dictum quam feugiat. Vestibulum fringilla a ex sed suscipit. Fusce accumsan tristique mi.\n\nSed nec rutrum nibh. Nunc luctus libero nunc, vel placerat diam euismod non. Aenean arcu velit, scelerisque lacinia tellus ut, pellentesque ultrices eros. Vivamus interdum eget eros a varius. Proin velit lectus, finibus sit amet malesuada eu, fermentum quis nisl. Nunc rhoncus ac justo quis dapibus. Nunc id augue mauris. Curabitur fermentum odio et mauris gravida tristique. Donec lacinia at tellus eget ornare. Phasellus eros felis, mattis et luctus sit amet, fringilla a elit. Nunc sodales nulla neque, vitae aliquet tortor dapibus in.',
        'Projekt-2');

INSERT INTO `access` (`id`, `project_role`, `project_id`, `user_id`)
VALUES (1, 0, 2, 2),
       (2, 1, 2, 3),
       (3, 2, 2, 4),
       (4, 2, 2, 5),
       (5, 3, 2, 6),
       (6, 0, 1, 3),
       (7, 1, 1, 2),
       (8, 2, 1, 6),
       (9, 3, 1, 4);

INSERT INTO `sprint` (`id`, `closed`, `end`, `name`, `start`, `project_id`)
VALUES (1, b'1', '2022-07-19', 'Sprint 1', '2022-07-12', 1),
       (2, b'0', '2022-08-25', 'Sprint 2', '2022-08-18', 1),
       (3, b'0', '2022-10-01', 'Sprint 3', '2022-09-24', 1),
       (4, b'1', '2022-07-16', 'Sprint 1', '2022-07-09', 2),
       (5, b'0', '2022-08-22', 'Sprint 2', '2022-08-15', 2),
       (6, b'0', '2022-09-28', 'Sprint 3', '2022-09-21', 2);

INSERT INTO `retro_note` (`id`, `note`, `sprint_id`, `note_type`)
VALUES (1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', 1, 1),
       (2, 'Maecenas id risus laoreet, tempus dui eget, convallis metus', 1, 1),
       (3, 'Suspendisse suscipit tincidunt ligula vel eleifend', 1, 2),
       (4, 'Donec ex urna, laoreet condimentum nunc et, pulvinar cursus felis', 1, 0),
       (5, 'Nam porta est sit amet nisl consequat, ac molestie erat porttitor', 1, 3),
       (6, 'Sed tristique arcu sit amet mauris fringilla semper?', 2, 2),
       (7, 'Suspendisse non pulvinar libero, vitae bibendum neque', 2, 0),
       (8, 'Proin molestie eros eu nisl elementum, vitae luctus felis aliquam', 4, 0),
       (9, 'Curabitur ornare ac metus lacinia fringilla', 4, 0),
       (10, 'Vivamus in faucibus lorem, ac facilisis turpis', 4, 1),
       (11, 'Nulla lobortis ultrices tortor', 4, 1),
       (12, 'Nulla lacus ipsum, lacinia ac orci a, sodales faucibus nibh?', 4, 3),
       (13, 'Pellentesque tincidunt eget quam a tristique', 5, 1),
       (14, 'Quisque sed congue lacus?', 5, 3);

INSERT INTO `task` (`id`, `created`, `description`, `end`, `name`, `task_state`, `assigned_to_id`, `created_by_id`,
                    `project_id`, `sprint_id`)
VALUES (1, '2022-07-27 09:18:55',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac lobortis risus, id molestie orci. Aliquam fringilla sapien et urna suscipit semper. Curabitur velit lacus, fermentum sit amet orci nec, porta condimentum nisl. Nulla molestie ex at diam volutpat volutpat. Vivamus vel varius ante, vitae tempus nisi. Sed ullamcorper ultricies aliquam. Vestibulum ante magna, aliquet vitae nisi non, mollis efficitur augue.',
        NULL, 'Zadanie 1', 3, 6, 2, 1, 1),
       (2, '2022-07-27 09:19:20',
        'In hac habitasse platea dictumst. Nam a facilisis neque. Phasellus et gravida diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam felis tortor, eleifend eget pulvinar eget, commodo eu quam. Pellentesque vitae sapien sed tellus sollicitudin pretium non in nunc. Curabitur aliquet nisi sem, ac sodales elit vehicula ac. Aenean ut velit dapibus, rhoncus dolor sed, tristique sem. Nullam et euismod nisl. Nam dictum, nisi nec bibendum tincidunt, tellus urna posuere nulla, eget iaculis arcu ex id arcu. Nulla facilisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin ac leo nibh.',
        NULL, 'Zadanie 2', 3, 6, 2, 1, 1),
       (3, '2022-07-27 09:19:38',
        'Curabitur leo tortor, dictum id porta quis, egestas quis ipsum. Etiam consequat sem felis, a auctor tellus gravida ut. Nulla facilisi. Vivamus ac metus purus. Donec nec placerat purus. Aenean ullamcorper nisl sem, sit amet vestibulum tellus mattis quis. Fusce suscipit, mauris a sagittis vehicula, justo purus luctus ligula, tempor posuere elit sem non tellus. Etiam maximus id velit in scelerisque. Maecenas a ante turpis. Suspendisse ut metus quis metus ultricies mattis quis a mauris. Aliquam at dolor urna. In vel massa at risus dignissim placerat. Aenean ut nulla quam.',
        NULL, 'Zadanie 3', 3, 6, 2, 1, 2),
       (4, '2022-07-27 09:19:49',
        'Mauris faucibus nulla erat, sed vehicula leo convallis nec. Aliquam nec sollicitudin lectus. Proin et efficitur metus. In a risus efficitur, tempor magna sit amet, bibendum nisi. Maecenas eu urna vestibulum, congue augue eu, condimentum velit. Suspendisse auctor lobortis velit vel porttitor. Fusce placerat molestie dapibus. Proin auctor aliquet eleifend. Sed urna lectus, cursus id quam sit amet, tincidunt tincidunt nisi. Pellentesque convallis orci id volutpat fermentum.',
        NULL, 'Zadanie 4', 3, 6, 2, 1, 2),
       (5, '2022-07-27 09:19:58',
        'Praesent tellus ante, tempus sed sem ac, ultricies feugiat orci. Maecenas lacus neque, cursus sit amet purus quis, convallis tempor ligula. Praesent a arcu at metus aliquam semper. Pellentesque sodales, leo et egestas placerat, lacus augue suscipit nibh, ac maximus tellus purus ac mauris. Suspendisse nunc ligula, rhoncus in semper nec, tincidunt eu ante. Nullam non ex justo. Suspendisse lacus mi, facilisis id arcu id, sodales aliquam massa. Nam vestibulum tincidunt velit sed tristique. Sed condimentum sit amet dui nec lacinia.',
        NULL, 'Zadanie 5', 3, 6, 2, 1, 2),
       (6, '2022-07-27 09:20:10',
        'Donec sagittis, metus non facilisis luctus, nibh enim pharetra nunc, dapibus vulputate arcu libero eu sem. Phasellus ante magna, sodales id tempus sed, lacinia sed nisl. Duis ante dolor, dapibus eu eros quis, blandit sodales est. Suspendisse potenti. Fusce malesuada diam nec sem posuere, vel malesuada sapien auctor. Donec tincidunt lectus vitae laoreet tristique. Integer id risus nunc. Mauris faucibus neque et magna aliquam tincidunt. Nullam cursus enim vel dui gravida, nec eleifend augue sodales. Mauris rhoncus bibendum quam quis placerat. In ullamcorper ultrices mi, ut pellentesque enim cursus at. Vivamus pretium non mauris vitae condimentum. Maecenas enim lorem, egestas ultricies lectus sit amet, tristique interdum augue.',
        NULL, 'Zadanie 6', 2, 6, 2, 1, 2),
       (7, '2022-07-27 09:20:17',
        'Pellentesque mattis libero erat, quis consectetur ex elementum rutrum. Nullam aliquet nibh vitae porta feugiat. Nam porttitor ultricies massa, eget consequat dui tristique semper. Phasellus ut pulvinar quam. Nam consequat facilisis orci, eget lacinia dui sagittis at. Pellentesque porttitor non elit non aliquet. Aliquam vitae dolor id massa efficitur ultrices. In scelerisque dolor sit amet egestas pellentesque. Vivamus ut quam eros.',
        NULL, 'Zadanie 7', 0, 6, 2, 1, 2),
       (8, '2022-07-27 09:20:24',
        'Donec elementum volutpat urna, nec accumsan orci mollis imperdiet. Pellentesque augue lorem, placerat eget ex sed, luctus consequat justo. Praesent in arcu lorem. Sed id diam sit amet orci auctor pharetra et quis nisl. Mauris dignissim magna id metus eleifend sodales posuere quis nisl. Ut vel vestibulum felis, quis efficitur libero. Donec eget elit leo. Nulla congue libero ex, id rhoncus metus iaculis a. Vestibulum ut sem ullamcorper, lobortis enim sit amet, pellentesque velit.',
        NULL, 'Zadanie 8', 0, NULL, 2, 1, NULL),
       (9, '2022-07-27 09:29:28',
        'Suspendisse lectus orci, lobortis vitae scelerisque non, malesuada id neque. Fusce at pellentesque ligula, molestie vehicula ante. Etiam dui orci, porttitor sed quam ut, dapibus tincidunt nisl. In hendrerit rutrum justo, a ullamcorper purus scelerisque nec. In sollicitudin ipsum nec volutpat molestie. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam quis massa purus. Phasellus tempus porta orci eget blandit. Nulla rutrum ultricies odio, et sagittis lorem fringilla at. Vivamus varius bibendum enim in interdum.',
        NULL, 'Zadanie 1', 3, 4, 3, 2, 4),
       (10, '2022-07-27 09:29:35',
        'Nulla volutpat ultrices lacus, eu venenatis erat euismod feugiat. Aenean ut tristique nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean ac lorem vel libero porta fermentum ut eget urna. Ut porttitor venenatis odio. Nullam euismod elementum consequat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla nec metus pretium, pulvinar massa ac, laoreet risus.',
        NULL, 'Zadanie 2', 3, 5, 3, 2, 4),
       (11, '2022-07-27 09:29:47',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel pulvinar turpis. Sed vel rhoncus ipsum. Donec aliquet porta massa vel eleifend. Curabitur maximus consequat purus sed egestas. Ut eget odio dui. Donec pellentesque velit ac sapien efficitur pulvinar. Sed vel malesuada sapien. Maecenas tincidunt convallis nulla, vel fermentum mi ullamcorper ac. In sollicitudin, mauris id dictum pulvinar, nibh nisi maximus nisl, vitae tristique turpis lectus vitae turpis. Quisque nisl libero, ullamcorper ac pulvinar vel, suscipit vitae leo. Nulla finibus purus id sagittis posuere. Nullam sit amet justo vitae augue gravida varius. Cras ac sapien laoreet, ultricies odio et, tempor elit.',
        NULL, 'Zadanie 3', 3, 4, 3, 2, 4),
       (12, '2022-07-27 09:29:56',
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed euismod congue eros pretium luctus. Suspendisse maximus efficitur arcu, id ultrices diam pellentesque eget. Praesent suscipit lacus sed iaculis euismod. Donec ultrices nunc odio, a dictum odio dapibus et. Aliquam at orci dui. Suspendisse nec lorem a metus consequat pellentesque faucibus non massa. Donec pretium euismod nulla, vel vehicula mi tincidunt nec. Morbi egestas lacus odio, ac dictum velit fermentum id.',
        NULL, 'Zadanie 4', 3, 5, 3, 2, 4),
       (13, '2022-07-27 09:30:04',
        'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi fringilla, mi non aliquet consectetur, nisl mauris viverra sem, non suscipit nisi lectus nec nisl. Etiam pulvinar tincidunt tellus, id pretium diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam laoreet ultricies sapien non cursus. Donec a nisi sit amet sapien ornare hendrerit. Donec sed augue est. Curabitur vulputate rhoncus elementum. Morbi nec ante a ligula suscipit bibendum eu vel metus. Nunc in felis quis arcu fringilla venenatis sollicitudin vel elit. Vestibulum lorem metus, aliquet ut dapibus ac, aliquet ac ante. Sed elementum sapien et magna lobortis, at pretium turpis scelerisque.',
        NULL, 'Zadanie 5', 3, 4, 3, 2, 4),
       (14, '2022-07-27 09:30:13',
        'Vivamus facilisis dictum magna in viverra. Nunc bibendum elit pharetra, commodo justo non, dictum elit. Morbi eleifend tristique nibh ac sagittis. Donec feugiat, est nec vehicula luctus, enim lorem mollis nisl, at interdum sapien eros varius purus. Duis non eros quis leo aliquam varius vitae at dui. Ut malesuada elementum eleifend. Nam ullamcorper ligula eget neque eleifend, at dictum elit pulvinar. Nulla ac nibh vel velit porttitor varius nec ut erat. Pellentesque porttitor nec dolor ac consectetur. Phasellus id lacus nec purus consequat rutrum non vitae nisl. Donec tristique, metus a luctus rutrum, leo elit lobortis lectus, at varius sem quam hendrerit dolor. Vestibulum elit erat, euismod et lectus sed, venenatis pellentesque ligula. Maecenas velit purus, mollis et fermentum in, euismod ut odio. Suspendisse a faucibus tortor, ac varius ante. Nullam fringilla nulla in risus sollicitudin, a viverra enim dignissim. Pellentesque sapien nisl, posuere et sem vitae, interdum mollis diam.',
        NULL, 'Zadanie 6', 3, 5, 3, 2, 4),
       (15, '2022-07-27 09:30:20',
        'Aenean accumsan dictum augue, quis rhoncus sapien fermentum at. Nulla vel lorem eget mi tempor tempus. Suspendisse potenti. Mauris quis lacinia dolor. Maecenas fermentum, augue vitae lacinia porta, ligula lorem porta velit, a rhoncus arcu sem vitae ipsum. Pellentesque eu nisi urna. Pellentesque bibendum at velit vitae dictum. Curabitur convallis lacinia consequat. In mollis bibendum metus, fermentum finibus felis. Morbi nec egestas libero.',
        NULL, 'Zadanie 7', 0, 4, 3, 2, 5),
       (16, '2022-07-27 09:30:28',
        'Aliquam sit amet sapien molestie tortor luctus tristique. Aenean est leo, semper a est sit amet, suscipit auctor est. Quisque feugiat massa quis urna pretium feugiat. Maecenas fringilla magna sodales orci imperdiet eleifend convallis in ante. Nullam vestibulum lorem arcu, commodo gravida nunc cursus sed. In sed dignissim lectus. Nullam quis augue hendrerit, euismod est eget, dictum ex. Nunc id aliquet magna, id congue arcu. Phasellus ultrices quam eu urna consectetur, ac faucibus dolor elementum. Phasellus euismod eu arcu at dapibus.',
        NULL, 'Zadanie 8', 0, 5, 3, 2, 5),
       (17, '2022-07-27 09:30:36',
        'Curabitur vitae turpis ac purus ultricies tincidunt. Phasellus sit amet nunc et quam malesuada hendrerit. Morbi vitae nibh elit. Donec ex metus, dictum ac efficitur a, tempus eget orci. Nunc sit amet mauris orci. Phasellus porttitor sem vitae vulputate cursus. Curabitur hendrerit, ante quis molestie viverra, quam sapien aliquam nisl, a elementum leo metus et ante. Cras facilisis dolor libero, sed ornare ante tincidunt ut.',
        NULL, 'Zadanie 9', 0, 4, 3, 2, 5),
       (18, '2022-07-27 09:30:45',
        'Praesent non turpis at dui blandit porttitor vel non nisl. Aliquam hendrerit velit et magna sagittis tincidunt. Sed at interdum nisi. Integer et lectus libero. Sed bibendum massa id lobortis mattis. Donec ullamcorper ut erat cursus convallis. Aliquam ut libero et orci lobortis elementum sagittis eu erat. Donec euismod nisl mauris, eget tincidunt velit fermentum non. Nunc consequat ornare justo et euismod. Duis risus risus, faucibus et aliquam quis, elementum eget augue. In hac habitasse platea dictumst. Proin hendrerit iaculis mauris, at finibus odio laoreet ullamcorper. Vivamus malesuada leo nec urna dignissim consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        NULL, 'Zadanie 10', 0, 6, 3, 2, 5),
       (19, '2022-07-27 09:30:52',
        'Proin ullamcorper enim id est interdum volutpat. Nulla odio leo, posuere nec eros consequat, faucibus tempus ligula. Pellentesque lacus libero, tincidunt sed dignissim iaculis, blandit vitae nibh. Ut tristique ornare tincidunt. Quisque sed felis sed dolor suscipit laoreet. Donec molestie leo pretium ipsum vehicula mollis. Nullam dignissim aliquam orci, in sagittis massa sodales at. Phasellus quis malesuada ligula. Pellentesque interdum tellus ex, non egestas ex iaculis vel. In pretium at turpis sodales viverra. Vestibulum felis risus, vestibulum at auctor vitae, lacinia vel ligula. In dapibus sem in nisl pharetra, eget feugiat nunc aliquet. Curabitur vulputate placerat dictum. Nunc porttitor ultrices augue vel pellentesque. Nullam efficitur in ligula pellentesque dapibus.',
        NULL, 'Zadanie 11', 0, NULL, 3, 2, 6),
       (20, '2022-07-27 09:30:59',
        'Curabitur tincidunt eu odio non sodales. Nam porta hendrerit turpis, vel cursus sapien aliquam tincidunt. Pellentesque sit amet erat commodo, placerat ex vitae, condimentum tellus. Nulla feugiat venenatis neque, at laoreet neque tristique nec. Quisque quis leo est. Morbi in dapibus erat, quis ultricies ipsum. Integer fermentum nisi nec justo imperdiet, et pharetra elit posuere. Morbi aliquam est at ex lobortis malesuada. Etiam tristique at est vitae congue.',
        NULL, 'Zadanie 12', 0, NULL, 3, 2, 6);