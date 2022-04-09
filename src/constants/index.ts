import Images from './images'

// Routes
export enum Roots{
  // Auth
  Login = 'Login',
  SignUp = 'SignUp',
  BasicInfo = 'BasicInfo',
  ForgotPassword = 'ForgotPassword',
  ResetPassword = 'ResetPassword',
  SignUpPhone = 'SignUpPhone',
  VerifyPhone = 'VerifyPhone',
  Instruction = 'Instruction',
  SignUpSocial = 'SignUpSocial',
  LoginSocial = 'LoginSocial',

  // Onboarding
  Onboarding = 'Onboarding',
  // App
  Dashboard = 'Dashboard',
  Support = 'Support',
  Accolades = 'Accolades',
  ManageHabits = 'ManageHabits',
  HabitChoice = 'HabitChoice',
  ConfirmHabit = 'ConfirmHabit',
  Paywall = 'Paywall',
  HabitSegment = 'HabitSegment',
  HabitPreview = 'HabitPreview',
  SuccessPage = 'SuccessPage',
  ProblemVideo = 'ProblemVideo',
  SegmentAdditionalInfo = 'SegmentAdditionalInfo',
  // Settings
  SettingsStack = 'SettingsStack',
  Settings = 'Settings',
  ProfileSettings = 'ProfileSettings',
  PasswordSettings = 'PasswordSettings',
  EmailSettings = 'EmailSettings',
  VideoPlayer = 'VideoPlayer',
  ImageFull = 'ImageFull',
}

export const Regex = {
  oneLower: /(?=.*[a-z])/,
  oneUpper: /(?=.*[A-Z])/,
  oneNumber: /.*[0-9].*/,
  oneSpecialChar: /(?=.*[~`!@#$%^&*()+=_\-{}[\]|:;"'?/<>,.])/,
}

export const Urls = {
  privacyPolicy: 'https://habitnest.com/pages/shipping-return-privacy-policies',
}

export enum HabitStates {
  ACTIVE,
  COMPLETE,
  LOCKED,
  WAITING,
}

export const HabitStateNames: Record<HabitStates, string> = {
  [HabitStates.ACTIVE]: 'In Progress',
  [HabitStates.COMPLETE]: 'Completed',
  [HabitStates.LOCKED]: 'Locked',
  [HabitStates.WAITING]: 'Waiting',
}

export enum ComponentTypes {
  MULTILINE = 'multiline',
  TIME = 'time',
  MULTIPLE_CHOICE = 'multiple_choice',
  CHECKLIST = 'checklist',
  PREFILLED_CHECKLIST = 'prefilled_checklist',
  CONFIRMATION = 'confirmation',
  DIVIDER = 'divider',
  MARKDOWN = 'markdown',
  MARKDOWN_TEMPLATE = 'markdown_template',
  VIDEO = 'video',
  AUDIO = 'audio',
  DURATION = 'duration',
  NUTRITION = 'nutrition',
  UPLOADER = 'uploader',
  STRETCHING = 'stretching',
  UNDEFINED = ''
}

export const ResponsiveComponents = [
  ComponentTypes.TIME,
  ComponentTypes.MULTILINE,
  ComponentTypes.CONFIRMATION,
  ComponentTypes.MULTIPLE_CHOICE,
  ComponentTypes.CHECKLIST,
  ComponentTypes.PREFILLED_CHECKLIST,
  ComponentTypes.DURATION,
  ComponentTypes.NUTRITION,
  ComponentTypes.UPLOADER,
  ComponentTypes.STRETCHING,
]

export enum TargetScreen {
  HABIT_PREVIEW = 'habit_preview',
  DASHBOARD = 'dashboard',
  DEFAULT = 'default',
}

export {
  Images,
}
