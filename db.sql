use vze_db;

create table user
(
    user_id   int primary key auto_increment,
    user_name VARCHAR(20) NOT NULL default 'suger',
    user_img  VARCHAR(1000)        default 'http://blog.qianlon.cn/upload/2021/11/image-c571dd25ab744ff0a954fae2cfe5b61a.png'
);


select *
from user
where user_id in (
    select user_id
    from user_contacter
    where user_contacter.contacter_id = 3
    union
    select contacter_id
    from user_contacter
    where user_contacter.user_id = 3
);

# 用户与联系人关联表
create table user_contacter
(
    user_id      int,
    contacter_id int,
    foreign key (user_id) references user (user_id),
    foreign key (contacter_id) references user (user_id)
);

create table user_contacter_message
(
    contacter_message_id int primary key auto_increment,
    user_id              int,
    contacter_id         int,
    message              TEXT,
    send_time            timestamp not null default current_timestamp,
    foreign key (user_id) references user (user_id),
    foreign key (contacter_id) references user (user_id)
);


# 群
create table block
(
    block_id   int primary key auto_increment,
    block_name VARCHAR(30) NOT NULL,
    owner_id   int default 1,
    foreign key (owner_id) references user (user_id)
);
alter table block
    add block_img VARCHAR(2000) default 'https://typora-1300781048.cos.ap-beijing.myqcloud.com/img/Snipaste_2022-03-03_19-41-05.png'


# 群和用户表
create table block_user
(
    block_id int,
    user_id  int,
    foreign key (block_id) references block (block_id),
    foreign key (user_id) references user (user_id)
);

# 群消息
create table block_message
(
    block_message_id int primary key auto_increment,
    block_id         int,
    user_id          int,
    at_user_id       int,
    message          TEXT,
    send_time        timestamp not null default current_timestamp comment '创建时间',
    foreign key (block_id) references block (block_id),
    foreign key (user_id) references user (user_id),
    foreign key (at_user_id) references user (user_id)
);


# mock
insert into user (user_name)
values ('千泷');
insert into user (user_name)
values ('小千');
insert into user (user_name)
values ('小泷');

insert into user_contacter value (2, 3);



insert into block (block_name, owner_id)
values ('Vze 家族', 1);

insert into block_user
values (1, 1);
insert into block_user
values (1, 2);
insert into block_user
values (1, 3);


insert into user_contacter value (3, 5)


select *
from user
where user_id in (
    select user_id
    from user_contacter
    where user_contacter.contacter_id = 3
    union
    select contacter_id
    from user_contacter
    where user_contacter.user_id = 3
)

