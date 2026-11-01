function Svg({ size = 20, className = '', children, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
}


export function ToothpasteNBrushIcon({ size = 20, className = '', ...props }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 512 512"
            fill="currentColor"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            {...props}
        >
            <path d="M326.761,223.639c-8.509,0-15.431,6.922-15.431,15.432c0,8.509,6.922,15.431,15.431,15.431c8.51,0,15.432-6.922,15.432-15.431C342.193,230.561,335.27,223.639,326.761,223.639z" />

            <path d="M409.803,92.011H243.719l-9.275,314.564h184.636L409.803,92.011z M326.761,284.918c-25.281,0-45.848-20.567-45.848-45.848c0-25.282,20.567-45.849,45.848-45.849c25.282,0,45.849,20.567,45.849,45.849C372.61,264.351,352.042,284.918,326.761,284.918z" />

            <polygon points="233.546,436.992 231.335,512 274.676,512 275.414,436.992" />

            <polygon points="419.976,436.992 378.109,436.992 378.847,512 422.188,512" />

            <polygon points="347.691,436.992 305.832,436.992 305.094,512 348.428,512" />

            <rect x="295.666" width="62.183" height="61.594" />

            <polygon points="187.359,30.417 187.359,0 152.144,0 136.935,0 89.812,0 89.812,512 152.144,512 152.144,152.086 187.359,152.086 187.359,121.669 152.144,121.669 152.144,111.53 187.359,111.53 187.359,81.113 152.144,81.113 152.144,70.974 187.359,70.974 187.359,40.556 152.144,40.556 152.144,30.417" />
        </svg>
    );
}



export function ToothIcon({ size = 20, className = '', ...props }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 311.572 311.572"
            fill="currentColor"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            {...props}
        >
            <path d="M239.964,0c-38.262,0-45.435,37.55-84.173,37.55C117.059,37.55,109.885,0,71.619,0C24.76,0,4.961,47.903,4.961,94.756s39.731,216.817,86.584,216.817c19.814,0,24.366-108.723,64.241-108.723s44.426,108.723,64.241,108.723c46.858,0,86.584-169.958,86.584-216.817S286.817,0,239.964,0z" />
        </svg>
    );
}

// SoapIcon
// https://www.svgrepo.com/svg/84604/soap?edit=true

// MouthwashIcon
// https://www.svgrepo.com/svg/66531/mouthwash?edit=true

// CannulaIcon
// https://www.svgrepo.com/svg/12071/cannula?edit=true

// ScalpelIcon
// https://www.svgrepo.com/svg/14698/scalpel?edit=true

// VirusIcon
// https://www.svgrepo.com/svg/2453/virus

// NurseIcon
// https://www.svgrepo.com/svg/10683/nurse

// GlovesIcon
// https://www.svgrepo.com/svg/2759/gloves

// LifebuoyIcon
// https://www.svgrepo.com/svg/360533/lifebuoy-f

/*
    HealthIcon
    HealthcareIcon
    MedicalIcon
    MedicineIcon
    HospitalIcon
    ClinicIcon
    MedicalCenterIcon
    DoctorIcon
    PhysicianIcon
    NurseIcon
    SurgeonIcon
    DentistIcon
    PharmacistIcon
    TherapistIcon
    PatientIcon
    HealthcareWorkerIcon
    MedicalStaffIcon
    AmbulanceIcon
    EmergencyIcon
    FirstAidIcon
    FirstAidKitIcon
    MedicalKitIcon
    MedicalCrossIcon
    StethoscopeIcon
    ThermometerIcon
    BloodPressureIcon
    BloodPressureMonitorIcon
    HeartRateIcon
    HeartMonitorIcon
    PulseIcon
    ECGIcon
    EKGIcon
    HeartbeatIcon
    HeartIcon
    LungsIcon
    BrainIcon
    KidneyIcon
    LiverIcon
    StomachIcon
    IntestineIcon
    DigestiveSystemIcon
    RespiratorySystemIcon
    NervousSystemIcon
    CirculatorySystemIcon
    SkeletalSystemIcon
    MuscularSystemIcon
    HumanBodyIcon
    HumanAnatomyIcon
    BodyIcon
    SkeletonIcon
    BoneIcon
    JointIcon
    SpineIcon
    MuscleIcon
    EyeIcon
    EarIcon
    NoseIcon
    MouthIcon
    ToothIcon
    TeethIcon
    TongueIcon
    SkinIcon
    HairIcon
    HandIcon
    FootIcon
    FootprintIcon
    BloodIcon
    BloodDropIcon
    BloodTestIcon
    BloodDonationIcon
    BloodTransfusionIcon
    LaboratoryIcon
    MedicalLabIcon
    TestTubeIcon
    MicroscopeIcon
    MedicalResearchIcon
    DiagnosisIcon
    MedicalDiagnosisIcon
    HealthCheckIcon
    MedicalCheckupIcon
    HealthScreeningIcon
    MedicalReportIcon
    MedicalRecordIcon
    ElectronicHealthRecordIcon
    PrescriptionIcon
    MedicationIcon
    PillIcon
    CapsuleIcon
    TabletMedicineIcon
    SyringeIcon
    InjectionIcon
    VaccineIcon
    VaccinationIcon
    IVDripIcon
    InfusionIcon
    BandageIcon
    PlasterIcon
    GauzeIcon
    WoundCareIcon
    StitchesIcon
    MedicalMaskIcon
    FaceMaskIcon
    GlovesIcon
    MedicalGlovesIcon
    WheelchairIcon
    CrutchesIcon
    WalkingAidIcon
    HearingAidIcon
    ProsthesisIcon
    ArtificialLimbIcon
    MedicalImplantIcon
    XRayIcon
    RadiologyIcon
    MRIIcon
    CTScanIcon
    UltrasoundIcon
    MedicalImagingIcon
    MammographyIcon
    EndoscopyIcon
    SurgeryIcon
    OperatingRoomIcon
    SurgicalInstrumentIcon
    ScalpelIcon
    AnesthesiaIcon
    IntensiveCareIcon
    ICUIcon
    RehabilitationIcon
    PhysicalTherapyIcon
    OccupationalTherapyIcon
    SpeechTherapyIcon
    PhysiotherapyIcon
    ChiropracticIcon
    OsteopathyIcon
    MassageTherapyIcon
    PainManagementIcon
    MentalHealthIcon
    PsychologyIcon
    PsychotherapyIcon
    CounselingIcon
    EmotionalWellbeingIcon
    StressManagementIcon
    AnxietyIcon
    DepressionIcon
    MindfulnessIcon
    MeditationIcon
    SleepHealthIcon
    SleepIcon
    InsomniaIcon
    NutritionIcon
    DietIcon
    DietitianIcon
    HealthyEatingIcon
    BalancedDietIcon
    HydrationIcon
    WaterIntakeIcon
    VitaminIcon
    VitaminsIcon
    MineralIcon
    SupplementIcon
    ProteinIcon
    CalorieIcon
    MetabolismIcon
    WeightManagementIcon
    WeightLossIcon
    WeightGainIcon
    BodyMassIndexIcon
    BMIIcon
    ObesityPreventionIcon
    FitnessHealthIcon
    PhysicalActivityIcon
    ExerciseIcon
    YogaIcon
    StretchingIcon
    RunningIcon
    WalkingIcon
    CyclingIcon
    SwimmingIcon
    WellnessIcon
    WellbeingIcon
    SelfCareIcon
    HealthcareManagementIcon
    PreventiveCareIcon
    PublicHealthIcon
    CommunityHealthIcon
    FamilyHealthIcon
    ChildHealthIcon
    PediatricIcon
    PregnancyIcon
    PrenatalCareIcon
    MaternalHealthIcon
    BabyHealthIcon
    BreastfeedingIcon
    WomenHealthIcon
    MenHealthIcon
    ReproductiveHealthIcon
    FertilityIcon
    MenstrualHealthIcon
    MenopauseIcon
    SexualHealthIcon
    AgingIcon
    ElderlyCareIcon
    GeriatricCareIcon
    DisabilityIcon
    AccessibilityIcon
    ChronicDiseaseIcon
    DiabetesIcon
    BloodSugarIcon
    GlucoseMonitorIcon
    HeartDiseaseIcon
    CancerAwarenessIcon
    AsthmaIcon
    AllergyIcon
    InfectionIcon
    VirusIcon
    BacteriaIcon
    ImmuneSystemIcon
    ImmunityIcon
    FeverIcon
    ColdIcon
    FluIcon
    HeadacheIcon
    MigraineIcon
    BackPainIcon
    ArthritisIcon
    OsteoporosisIcon
    EpilepsyIcon
    NeurologyIcon
    CardiologyIcon
    DermatologyIcon
    OphthalmologyIcon
    OrthopedicsIcon
    OncologyIcon
    GynecologyIcon
    UrologyIcon
    EndocrinologyIcon
    GastroenterologyIcon
    PsychiatryIcon
    PulmonologyIcon
    MedicalAppointmentIcon
    DoctorAppointmentIcon
    TelemedicineIcon
    OnlineConsultationIcon
    HealthInsuranceIcon
    MedicalBillingIcon
    HospitalBedIcon
    PatientMonitoringIcon
    MedicalAlertIcon
    EmergencyContactIcon
    EmergencyRoomIcon
    DefibrillatorIcon
    AEDIcon
    CPRIcon
    OrganDonationIcon
    OrganTransplantIcon
    MedicalEthicsIcon
    HealthEducationIcon
    HealthAwarenessIcon
    HealthDataIcon
    HealthAnalyticsIcon
    DigitalHealthIcon
    HealthAppIcon
    WearableHealthIcon
    SmartHealthIcon
    MedicalTechnologyIcon
    HealthcareInnovationIcon
*/