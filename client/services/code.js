function encode(n) {
    return (n ** 2).toString(32);
}

export const CODE = {
    user: encode(100),
    account: encode(101),
    pwd: encode(102),
    remember: encode(103),
    info: encode(104),
    token: encode(105),
    category: encode(106),
    role: encode(107),
    rights: encode(108), // 用户的权限
    auth: encode(109), // 所有权限列表

    allGrade: encode(120),
    grade: encode(121),

    classes: encode(130),
    allClasses: encode(131),

    school: encode(140),
    allSchools: encode(141),

    schoolConf: encode(150),

    student: encode(160),
};

