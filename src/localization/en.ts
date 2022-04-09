const enStrings = {
  appName: "HabitNest",

  auth: {
    errors: {
      emptyEmail: "Email cannot be empty.",
      invalidEmail: "Incorrect email address.",
      emptyPassword: "Password cannot be empty.",
      incorrectPassword: "Incorrect password.",
      passwordsDoesNotMatch: "Passwords do not match.",
      emptyFirstName: "First name cannot be empty.",
      emptyLastName: "Last name cannot be empty.",
      emptyPhoneNumber: "Phone number cannot be empty.",
      emptyBirthday: "Birthday cannot be empty.",
      min: (count: number) => `Be at least ${count} characters`,
      max: (count: number) => `Not exceed ${count} characters`,
      invalidPhoneNumber: "Invalid phone number.",
      invalidVerificationCode: "Verification code cannot be empty.",
      signInCanceled: "User cancelled the login flow",
      inProgress: "Operation (e.g. sign in) is in progress already",
      playStoreNotAvailable:
        "Play services not available at this moment, try again later.",
    },
    instruction: {
      title: "Instructions sent!",
      description:
        "If you have a HabitNest account, you will receive a reset link with instructions to create a new password.",
      goBackLogin: "Go back to Log in",
      openEmailApp: "Open email app",
    },
    passwordValidErr: {
      oneNumber: "Contain at least one number",
      oneSpecialChar: "Contain at least one special character",
      empty:
        "Password must be 8 characters and contain at least one letter, one number and one special character.",
    },
    forgotPassword: {
      title: "Forgot Password",
      description:
        "Please enter your email below to receive your password reset instructions.",
      haveAccount: "Have an account?",
      login: "Login.",
    },
    resetPassword: {
      title: "Recovery Password",
      description:
        "Reset code was sent to your email. Please enter your new password.",
      password: "Password",
      confirmPassword: "Confirm Password",
      buttonTitle: "Reset Password",
      oldPassword: "Old password",
      newPassword: "New password",
    },
    phone: {
      description: "Please enter your phone number so we can get started.",
      mask: "(xxx) xxx-xxxx",
      buttonTitle: "Verify Phone Number",
    },
    verifyCode: {
      description:
        "Please enter the verification code we sent to your phone number.",
      code: "Enter verification code",
      buttonTitle: "Submit",
      resendButton: "Resend Code",
      changeNumber: "Change number",
      sentTo: "Code sent to",
    },
    login: {
      title: "Welcome to Your New Home For Healthy Habits",
      description: "Please log in below to continue.",
      buttonTitle: "Login",
      forgotPassword: "Forgot Password?",
      dontHaveAccount: "Don't have account?",
      signUp: "Sign up.",
    },
    signup: {
      title: "Welcome to Your New Home For Healthy Habits",
      description: "Create a free account before beginning your habit journey.",
      haveAnAccount: "Have an account?",
      byProceedingYouAlsoAgreeTo: (privacyPolicyUrl: string): string =>
        `I agree to Habit Nest's No-Nonsense ${privacyPolicyUrl} `,
      buttonTitle: "Sign Up",
      emailAddress: "Email Address",
      password: "Password",
      confirmPassword: "Confirm Password",
      loginFooter: "Login.",
      alreadyInUse: "Email used. Please use original sign up method.",
    },
    basicInfo: {
      title: "Welcome to Your New Home For Healthy Habits",
      description: "Create a free account before beginning your habit journey.",
      firstName: "First Name",
      lastName: "Last Name",
      phone: "Phone Number",
      photoLibraryPermissionBlockedTitle: "Permission Denied",
      photoLibraryPermissionBlockedMessage:
        "Please grant a permission in Settings in order to continue.",
    },
    strengthPassword: {
      veryWeak: "Very Weak",
      weak: "Weak",
      medium: "Medium",
      strong: "Strong",
      veryStrong: "Very Strong",
    },
    profile: {
      signOut: "Sign-out",
      deleteAccount: "Delete Account",
      areYouSureSignOut: "Are you sure you’d like to sign-out of your account?",
      permantlyDelete: "Permantly delete your account and habit progress?",
      notGoingBack: "No going back, once your account is gone, it’s gone!",
      deleteMyAccount: "Delete My Account",
    },
  },
};

export type EnStringsObjType = typeof enStrings;

export default enStrings;
