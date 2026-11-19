function Svg({ size = 20, className = '', children }) {
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
      >
        {children}
      </svg>
    )
}

export function Heart2Icon({ size = 20, className = '', ...props }) {
    return (
        <svg viewBox="1 2 22 20" fill="none" size={size} {...props}><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="M7 2C3.313 2 1 5.215 1 8.5c0 3.341 1.674 6.2 3.772 8.43 2.1 2.233 4.705 3.927 6.78 4.964a1 1 0 0 0 .895 0c2.076-1.037 4.68-2.73 6.782-4.964C21.326 14.7 23 11.84 23 8.5 23 5.22 20.729 2 17 2c-1.725 0-2.947.48-3.881 1.21a7 7 0 0 0-1.122 1.126 7 7 0 0 0-1.132-1.128C9.929 2.48 8.709 2 7 2" fill="currentColor"/></svg>
    )
}

export function HeartbreakIcon({ size = 20, className = '', ...props }) {
    return (
        <svg size={size} {...props} viewBox="0 45.462 512 421.075" xml:space="preserve" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"><path class="st0" d="M227.001 101.475c-20.311-28.121-50.054-55.093-98.404-55.985C61.21 44.115 0 93.152 0 201.398c0 106.707 91.753 182.419 148.344 220.977 29.527 20.218 65.018 36.116 78.38 41.802l35.265-154.45-74.09-82.034zM111.92 307.92c-6.948 4.947-16.565 3.336-21.521-3.592-12.594-17.632-21.943-37.625-25.679-59.742-1.981-11.834-3.028-22.826-3.028-33.068 0-10.294 1.057-19.859 3.346-28.675 2.156-8.231 10.592-13.168 18.823-11.022 8.242 2.156 13.178 10.592 11.022 18.822-1.499 5.716-2.35 12.685-2.35 20.875 0 8.149.831 17.468 2.606 27.936 2.833 16.76 9.945 32.329 20.372 46.954 4.948 6.939 3.337 16.565-3.591 21.512m20.886-184.45c-4.854 2.935-8.416 6.034-11.053 9.288-5.379 6.599-15.088 7.594-21.708 2.217-6.588-5.378-7.584-15.086-2.206-21.696 5.162-6.342 11.597-11.721 18.997-16.195 7.297-4.414 16.78-2.074 21.172 5.214 4.415 7.285 2.085 16.779-5.202 21.172"/><path class="st0" d="M383.392 45.49c-51.347.944-81.726 31.313-102.078 61.23a24.2 24.2 0 0 1-3.069 3.725l-33.9 109.436 73.043 80.874-37.84 165.782c.071-.021.144-.041.205-.062 0 0 46.728-18.658 83.902-44.101C420.247 383.817 512 308.105 512 201.398 512 93.152 450.78 44.115 383.392 45.49"/></g></svg>
    )
}

export function Heart3Icon({ size = 20, className = '', ...props }) {
    return (
        <svg version="1.0" {...props} size={size} viewBox="0 5 64 53" xml:space="preserve" fill="currentColor"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="M48 5a15.95 15.95 0 0 0-11.313 4.687l-3.979 3.961a1 1 0 0 1-1.414 0s-3.971-3.97-3.979-3.961A15.95 15.95 0 0 0 16 5C7.163 5 0 12.163 0 21c0 3.338 1.024 6.436 2.773 9 0 0 .734 1.164 1.602 2.031l24.797 24.797C29.953 57.609 30.977 58 32 58s2.047-.391 2.828-1.172l24.797-24.797c.867-.867 1.602-2.031 1.602-2.031A15.9 15.9 0 0 0 64 21c0-8.837-7.163-16-16-16m9 17a1 1 0 0 1-1-1 8 8 0 0 0-8-8 1 1 0 1 1 0-2c5.522 0 10 4.478 10 10a1 1 0 0 1-1 1"/></svg>
    )
}

export function HeartTowerIcon({ size = 20, className = '', ...props }) {
    return (
        <svg fill="currentColor" viewBox="3.8 1.435 24.283 29.23" {...props} size={size}><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><title>heart-tower</title><path d="m28.083 30.665-1.791-5.793h-2.456V13.1l3.816-4.731V1.435h-4.02v3.27h-2.447v-3.27h-4.064v3.27h-2.403v-3.27h-4.064v3.27H8.251v-3.27h-4.02v6.934L8.047 13.1v11.772H5.591L3.8 30.665h24.281zM15.265 11.689l.077.088.021.025.076.092.006.008q.067.084.131.174l.044.062.044.065.053.081.037.059a3 3 0 0 1 .089.148q.045.076.087.156l.011-.017q.037-.065.078-.128l.038-.058.054-.082.047-.068q.023-.034.047-.065l.055-.073.041-.053.063-.079.033-.039q.036-.044.074-.085l.017-.019q.093-.104.192-.2h-.001c1.681-1.648 4.334-1.575 5.671 0a2 2 0 0 1 .101.127q.044.057.086.117l.019.028.066.1.026.043.053.09.03.055.044.083.032.065q.019.038.036.078a2 2 0 0 1 .062.147l.031.083.025.069.03.091.02.066.028.099.016.062.025.108.012.058a4 4 0 0 1 .054.344l.014.136.003.04q.006.074.009.149.008.178.002.367c-.129 4.035-5.598 5.38-7.244 9.666-1.739-4.286-7.357-5.373-7.222-9.666a5 5 0 0 1 .041-.482l.006-.044.021-.13.008-.045.026-.127.01-.044.031-.125.011-.04q.016-.063.036-.125l.011-.033.043-.128.007-.018q.131-.365.321-.683l.013-.022.064-.102.021-.033.064-.093.027-.037a5 5 0 0 1 .162-.207l.032-.038c1.385-1.613 3.965-1.86 5.603-.038z"/></svg>
    )
}

// HeartTowerIcon
// https://www.svgrepo.com/svg/499216/heart-tower

// HeartPlusIcon
// https://www.svgrepo.com/svg/485739/heart1

// HeartMinusIcon
// https://www.svgrepo.com/svg/485740/heart2

// Heart3Icon
// https://www.svgrepo.com/svg/485737/heart

// HeartElectrocardiogramIcon
// https://www.svgrepo.com/svg/482737/heart-electrocardiogram-2

// HeartWolfIcon
// https://www.svgrepo.com/svg/499276/love-howl

// HeadLoveIcon
// https://www.svgrepo.com/svg/483525/love

// HandLoveIcon
// https://www.svgrepo.com/svg/477694/love-1

// LoveIcon
// https://www.svgrepo.com/svg/410561/love

// LoveFeelingIcon
// https://www.svgrepo.com/svg/390268/love

// HeartGearIcon
// https://www.svgrepo.com/svg/322731/love-mystery

// LoveMusicNoteIcon
// https://www.svgrepo.com/svg/321075/love-song

// LovebirdsIcon
// https://www.svgrepo.com/svg/284933/love-birds

// LoveLetterIcon
// https://www.svgrepo.com/svg/272827/love-letter-love-and-romance

// LoveNoteIcon
// https://www.svgrepo.com/svg/272798/love-letter-love-and-romance

// LoveEnvelloppeIcon
// https://www.svgrepo.com/svg/247268/love-letter-love-and-romance

// HeartHarmonyIcon
// https://www.svgrepo.com/svg/295250/hearts-harmony

// Love2Icon
// https://www.svgrepo.com/svg/106507/hearts

// Love3Icon
// https://www.svgrepo.com/svg/57725/hearts-with-differences

// LoveCardIcon
// https://www.svgrepo.com/svg/247231/ace-of-hearts-black-jack

// HeartSpermIcon
// https://www.svgrepo.com/svg/168167/heart-shaped-sperm

// HeartCartIcon
// https://www.svgrepo.com/svg/175441/shopaholic-shopping-cart-with-hearts

// DrawingHeartIcon
// https://www.svgrepo.com/svg/163421/drawing-hearts

// HeartBadgeIcon
// https://www.svgrepo.com/svg/128476/badge-heart

// HeartLockIcon
// https://www.svgrepo.com/svg/19216/heart-lock-with-key-hole

// HeartKeyIcon
// https://www.svgrepo.com/svg/322511/heart-key

// PregnantIcon
// https://www.svgrepo.com/svg/368293/pregnant

// WeddingCakeIcon
// https://www.svgrepo.com/svg/368333/wedding-cake

/*
    LoveIcon
    HeartIcon
    HeartsIcon
    RedHeartIcon
    PinkHeartIcon
    WhiteHeartIcon
    BlackHeartIcon
    BlueHeartIcon
    GreenHeartIcon
    PurpleHeartIcon
    YellowHeartIcon
    OrangeHeartIcon
    BrokenHeartIcon
    MendingHeartIcon
    HealingHeartIcon
    GrowingHeartIcon
    SparklingHeartIcon
    BeatingHeartIcon
    BurningHeartIcon
    TwoHeartsIcon
    HeartDecorationIcon
    HeartOutlineIcon
    HeartFilledIcon
    HeartShapeIcon
    HeartHandIcon
    HeartHandsIcon
    HeartGestureIcon
    HeartBalloonIcon
    HeartGiftIcon
    HeartCakeIcon
    HeartEnvelopeIcon
    HeartLockIcon
    HeartKeyIcon
    HeartShieldIcon
    HeartStarIcon
    HeartSparklesIcon
    HeartArrowIcon
    CupidArrowIcon
    CupidIcon
    LoveArrowIcon
    LoveLetterIcon
    LoveNoteIcon
    LoveMessageIcon
    LoveCardIcon
    LovePostcardIcon
    LoveEnvelopeIcon
    LoveStampIcon
    LoveSealIcon
    LoveStoryIcon
    LoveSongIcon
    LovePoemIcon
    LoveQuoteIcon
    LoveSymbolIcon
    LoveLanguageIcon
    LoveExpressionIcon
    LoveDeclarationIcon
    LoveConfessionIcon
    RomanticMessageIcon
    RomanticGestureIcon
    RomanticGiftIcon
    RomanticSurpriseIcon
    RomanticDinnerIcon
    RomanticDateIcon
    RomanticEveningIcon
    RomanticNightIcon
    RomanticGetawayIcon
    RomanticTripIcon
    RomanticVacationIcon
    RomanticMusicIcon
    RomanticDanceIcon
    RomanticMovieIcon
    RomanticLightingIcon
    RomanticCandleIcon
    CandlelightDinnerIcon
    RoseIcon
    RedRoseIcon
    PinkRoseIcon
    WhiteRoseIcon
    RoseBouquetIcon
    FlowerBouquetIcon
    FlowersIcon
    TulipIcon
    LilyIcon
    OrchidIcon
    PeonyIcon
    SunflowerIcon
    DaisyIcon
    FlowerHeartIcon
    FloralHeartIcon
    HeartBouquetIcon
    PetalIcon
    FlowerPetalsIcon
    RosePetalsIcon
    WeddingRoseIcon
    LoveFlowerIcon
    LoveTreeIcon
    LoveGardenIcon
    LoveBirdsIcon
    DoveIcon
    SwansIcon
    LoveBirdsCoupleIcon
    CoupleIcon
    CouplesIcon
    RomanticCoupleIcon
    CoupleHeartIcon
    CoupleHoldingHandsIcon
    HoldingHandsIcon
    HandHoldingHeartIcon
    HugIcon
    EmbraceIcon
    KissIcon
    KissingCoupleIcon
    KissingFaceIcon
    BlowingKissIcon
    RomanticKissIcon
    ForeheadKissIcon
    CuddleIcon
    CuddlingCoupleIcon
    AffectionIcon
    AffectionateGestureIcon
    TendernessIcon
    IntimacyIcon
    PassionIcon
    RomanceIcon
    RomanticLoveIcon
    TrueLoveIcon
    EternalLoveIcon
    UnconditionalLoveIcon
    FirstLoveIcon
    YoungLoveIcon
    SelfLoveIcon
    SelfCareIcon
    SelfCompassionIcon
    FriendshipLoveIcon
    FamilyLoveIcon
    MotherlyLoveIcon
    FatherlyLoveIcon
    ParentalLoveIcon
    SiblingLoveIcon
    PetLoveIcon
    AnimalLoveIcon
    PuppyLoveIcon
    LongDistanceLoveIcon
    DistanceLoveIcon
    SoulmateIcon
    TwinFlameIcon
    KindredSpiritIcon
    SoulConnectionIcon
    DeepConnectionIcon
    EmotionalConnectionIcon
    HeartConnectionIcon
    LoveBondIcon
    EternalBondIcon
    RelationshipIcon
    RelationshipGoalsIcon
    RelationshipStatusIcon
    RelationshipGrowthIcon
    RelationshipSupportIcon
    RelationshipCounselingIcon
    RelationshipAdviceIcon
    RelationshipCommunicationIcon
    CoupleTherapyIcon
    MarriageIcon
    MarriedCoupleIcon
    WeddingIcon
    WeddingRingsIcon
    WeddingRingIcon
    EngagementIcon
    EngagementRingIcon
    DiamondRingIcon
    ProposalIcon
    MarriageProposalIcon
    WeddingProposalIcon
    WeddingBouquetIcon
    WeddingCakeIcon
    WeddingVowsIcon
    WeddingArchIcon
    WeddingInvitationIcon
    AnniversaryIcon
    WeddingAnniversaryIcon
    MarriageAnniversaryIcon
    CoupleAnniversaryIcon
    ValentineIcon
    ValentinesDayIcon
    ValentinesCardIcon
    ValentinesGiftIcon
    ValentinesHeartIcon
    ValentinesFlowersIcon
    ValentinesChocolateIcon
    ChocolateBoxIcon
    HeartChocolateIcon
    LoveCandyIcon
    CandyHeartIcon
    SweetheartIcon
    SweetLoveIcon
    LoveTeddyBearIcon
    TeddyBearIcon
    LovePresentIcon
    LoveBoxIcon
    GiftForPartnerIcon
    SurpriseGiftIcon
    LoveRibbonIcon
    LoveBowIcon
    LoveTrophyIcon
    LoveMedalIcon
    LoveCertificateIcon
    LoveCouponIcon
    DateNightIcon
    DinnerForTwoIcon
    CoupleDinnerIcon
    RestaurantDateIcon
    PicnicForTwoIcon
    BeachRomanceIcon
    SunsetRomanceIcon
    StargazingCoupleIcon
    MoonlightRomanceIcon
    LoveUnderStarsIcon
    RomanticTravelIcon
    HoneymoonIcon
    LoveDestinationIcon
    CoupleVacationIcon
    LoveMemoryIcon
    SharedMemoriesIcon
    MemoryBookIcon
    CouplePhotoIcon
    LovePhotoIcon
    CouplePortraitIcon
    LoveAlbumIcon
    ScrapbookLoveIcon
    LoveDiaryIcon
    RelationshipJournalIcon
    LoveCalendarIcon
    CountdownToLoveIcon
    DaysTogetherIcon
    LoveTimelineIcon
    LoveMilestoneIcon
    HeartbeatIcon
    HeartPulseIcon
    HeartHealthIcon
    HeartCareIcon
    HeartWarmthIcon
    HeartGlowIcon
    HeartEnergyIcon
    HeartUnityIcon
    HeartHarmonyIcon
    HeartPeaceIcon
    HeartHopeIcon
    HeartFaithIcon
    HeartJoyIcon
    HeartHappinessIcon
    HeartGratitudeIcon
    HeartForgivenessIcon
    HeartTrustIcon
    HeartRespectIcon
    HeartLoyaltyIcon
    HeartDevotionIcon
    HeartCommitmentIcon
    HeartPromiseIcon
    HeartVowIcon
    HeartForeverIcon
    HeartInfinityIcon
    InfiniteLoveIcon
    LoveInfinityIcon
    LoveForeverIcon
    LoveNeverEndsIcon
    LoveAndPeaceIcon
    LoveAndKindnessIcon
    LoveAndCareIcon
    LoveAndFriendshipIcon
    LoveAndUnityIcon
    LoveAndHarmonyIcon
    LoveAndHopeIcon
    LoveAndJoyIcon
*/