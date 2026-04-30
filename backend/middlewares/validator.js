import { body } from "express-validator";

export let validateRegisterUser=()=> {
    return [
    body('firstName').notEmpty().withMessage('First Name is required')
    .isLength({min:3}).withMessage('First Name should be at least 3 characters'),

    body('lastName').notEmpty().withMessage('Last Name is required')
    .isLength({min:3}).withMessage('Last Name should be at least 3 characters'),

    body('email').notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email'),

    body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password should be at least 6 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'),

    body('birthDate').notEmpty().withMessage('Birth Date is required')
    .isDate().withMessage('Please enter a valid date'),

    body('gender').notEmpty().withMessage('Gender is required')
    .isIn(['MALE', 'FEMALE']).withMessage('Please enter a valid gender')
]
}

export const validateLoginUser = ()=> {
    return [
        body('email')
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Invalid email'),
        body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password should be at least 6 characters')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'),
    ];
}


export const createTaskValidation = ()=>{
    return [
    body("title")
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 3 })
        .withMessage("Title must be at least 3 characters"),

    body("description")
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ min: 5 })
        .withMessage("Description must be at least 5 characters"),

    body("status")
        .notEmpty()
        .withMessage("Status is required")
        .isIn(["PENDING", "IN_PROGRESS", "COMPLETED"])
        .withMessage("Invalid status value"),

];
}