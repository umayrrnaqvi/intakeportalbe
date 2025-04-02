const mongoose = require("mongoose");
const formSchema = new mongoose.Schema(
  {
    // First Form - Personal Details
    name: { type: String, required: true, trim: true },
    socialSecurityNumber: { type: Number, required: true },
    dateOfBirth: { type: Date, required: true },
    address: { type: String, required: true },
    homePhone: { type: String, unique: true, required: true },
    mobilePhone: { type: String, unique: true, required: true },
    workPhone: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    methodToReach: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    timeToReachYou: { type: String, required: true },
    spouseName: { type: String, required: true },
    numberOfChildren: { type: Number, required: true },
    // Second Form - Incident Details
    injuryOccurDate: { type: Date, required: true },
    referredYouToOurOffice: { type: String, required: true },
    injuryCause: {
      type: String,
      enum: [
        "Aircraft accident", "Animal bite or attack", "Assault and battery",
        "Defective premises", "Defective product", "Police negligence",
        "Medical malpractice", "Motor vehicle accident", "Slip or trip and fall",
        "Water-related accident", "Other"
      ],
      required: true,
    },
    otherInjuryCause:{type:String,required:true},
    injuryCity: { type: String, required: true },
    injuryState: { type: String, required: true },
    injuryCountry: { type: String, required: true },
    dateOfIncident: { type: Date, required: true },
    // Third Form - Injury Description
    howInjuryOccurred: { type: String, required: true },
    responsibleForYourInjury: { type: String, required: true },
    describeInjuries: { type: String, required: true },
    // Fourth Form - Doctor Details
    doctorName: { type: String, required: true },
    doctorPhoneNumber: { type: String, required: true },
    doctorAddress: { type: String, required: true },
    // Fifth Form - Expenses
    medicalExpensesIncurredToDate: { type: Number, required: true },
    insuranceCompanyInvolve: { type: String, required: true },
    expectedFutureMedicalExpenses: { type: String, required: true },
    incomeBeforeInjuryPer: { type: Number, required: true },
    incomeBeforInjuryPerType: { type: String, required: true },
    incomeAfterInjuryPer: { type: Number, required: true },
    incomeAfterInjuryPerType: { type: String, required: true },
    lostIncomeDueToInjury: { type: String,
        //  required: true 
        },
    // Sixth Form - Employment Details
    employerName: { type: String, required: true },
    employerPosition: { type: String, required: true },
    employerAddress: { type: String, required: true },
    employerTelephoneNumber: { type: String, required: true },
    inPain: { type: String },
    currentlyWorking: { type:String,
        //  required: true
         },
    // Seventh Form - Personal Loss
    wayYourLifeDamage: { type: String, required: true },
    spouseExperiencedAnyLossDueToInjury: { type: String, required: true },
    // Eighth Form - Witness Details
    witnessDetail: { type: String, required: true },
    // Ninth Form - Attorney Details
    conversationOfTheIncident: { type: String, required: true },
    informationProvideYouAtTheScene: { type: String, required: true },
    shoesWornAtTheTimeOfInjury: { type: String, required: true },
    fallOccurredHowLand: { type: String, required: true },
    slippedButNotFallWhatStop: { type: String, required: true },
    previouslyConsultedAnAttorney: { type: String, required: true },
    // Tenth Form - Additional Notes
    additionalNote: { type: String, required: true },
  },
  { timestamps: true }
);
const UserForm = mongoose.model("UserForm", formSchema);
module.exports = UserForm;