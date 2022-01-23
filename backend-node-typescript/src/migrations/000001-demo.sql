CREATE TABLE demo
(
    cdDemo TEXT NOT NULL,
    deDescricao TEXT NOT NULL,
    flStatus CHAR(1) NOT NULL CONSTRAINT ckc_demo_flstatus CHECK (flStatus IN ('A', 'I')) DEFAULT 'I',

    CONSTRAINT pk_demo PRIMARY KEY (cdDemo)
);