import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const LoginValidator = [
    // body('name').notEmpty().withMessage('Name is required'),
    body("email")
        .trim()
        .isEmail()
        .withMessage("Email required and should be in email format"),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password should be atleast 6 characters"),
];
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...LoginValidator,
];
//# sourceMappingURL=validators.js.map