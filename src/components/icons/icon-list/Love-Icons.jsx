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


export function HeartPlusIcon({ size = 20, className = '', ...props }) {
  return (
        <svg fill="currentColor" size={size} {...props} viewBox="2 3.99 28 24.021" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><title>heart1</title><path d="M24 12.977c-3.866 0-7 3.158-7 7.055 0 2.22 1.02 4.197 2.609 5.491A59 59 0 0 1 16 28.011S2 19.359 2 12.389c0-4.2 2.583-8.399 7.5-8.399 4.5 0 6.5 4.296 6.5 4.296s1.75-4.296 6.5-4.296 7.416 4.115 7.416 8.399c0 .958-.272 1.943-.716 2.932a6.95 6.95 0 0 0-5.2-2.344m0 1.007c3.313 0 6 2.707 6 6.047s-2.687 6.048-6 6.048-6-2.708-6-6.048 2.686-6.047 6-6.047m-3 7.055h2v2.016h2v-2.016h2v-2.016h-2v-2.016h-2v2.016h-2z"/></svg>
    );
}

export function HeartMinusIcon({ size = 20, className = '', ...props }) {
  return (
        <svg fill="currentColor" size={size} {...props} viewBox="2 3.99 28 24.021" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><title>heart2</title><path d="M24 12.977c-3.866 0-7 3.158-7 7.055 0 2.22 1.02 4.197 2.609 5.491A59 59 0 0 1 16 28.011S2 19.359 2 12.389c0-4.2 2.583-8.399 7.5-8.399 4.5 0 6.5 4.296 6.5 4.296s1.75-4.296 6.5-4.296 7.416 4.115 7.416 8.399c0 .958-.272 1.943-.716 2.932a6.95 6.95 0 0 0-5.2-2.344m0 1.007c3.313 0 6 2.707 6 6.047s-2.687 6.048-6 6.048-6-2.708-6-6.048 2.686-6.047 6-6.047m-3 7.055h6v-2.016h-6z"/></svg>
    );
}

export function HeartElectrocardiogramIcon({ size = 20, className = '', ...props }) {
  return (
        <svg version="1.1" size={size} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 36.221 512 439.558" xml:space="preserve" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"><path class="st0" d="m319.141 324.732-39.844-79.218-46.625 140.703-62.969-214.25-29.437 112.75H64.953l191.031 191.062 191.063-191.062h-89.188z"/><path class="st0" d="M473.984 74.248c-50.688-50.703-132.875-50.703-183.563 0-17.563 17.563-29.031 38.891-34.438 61.391-5.375-22.5-16.844-43.828-34.406-61.391-50.688-50.703-132.875-50.703-183.563 0-50.688 50.672-50.688 132.875 0 183.547l3.594 3.594h80.625l46.125-176.703 65.656 223.328 40.875-123.281 50.344 100.156 22.75-23.5h122.406l3.594-3.594c50.689-50.672 50.689-132.875.001-183.547"/></g></svg>
    );
}

export function HeartWolfIcon({ size = 20, className = '', ...props }) {
  return (
        <svg fill="currentColor" size={size} {...props} viewBox="1.306 1.873 29.55 28.084" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><title>love-howl</title><path d="M30.851 10.221C30.58 1.583 20.134-1.331 15.788 6.197 13.173-1.152 1.031 1.436 1.311 10.221c.077 2.396 1.031 4.529 2.423 6.469l6.645-2.215c-1.24-.065-2.555-.59-4.289-2.035 2-1.18 3.612-1.295 5.674-1.464 1.667-.898 4.147-1.679 5.248-1.093 1.933-1.143 4.344-2.612 6.778-3.535.317 1.243.333 2.779.219 4.227l-.656-.875c-3.211.722-4.826 7.037-.036 4.409l.656-1.057c.11.991.212 1.908 0 2.733a40.5 40.5 0 0 1-6.45 3.717c-1.107.974-3.283 4.091-3.921 6.796 1.249 1.253 2.18 2.458 2.502 3.659 1.289-4.812 15.023-10.971 14.748-19.737zm-16.958 1.425a5.17 5.17 0 0 1 2.685-.557c.285 1.984-1.61 1.757-2.685.557"/></svg>
    );
}

export function HeadLoveIcon({ size = 20, className = '', ...props }) {
  return (
        <svg size={size} {...props} viewBox="34.744 0.003 442.512 511.994" xml:space="preserve" fill="currentColor"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="m475.619 295.503-41.406-87.766c.094-2.641.203-5.266.203-7.906C434.416 89.472 344.932.003 234.588.003 124.213.003 34.744 89.472 34.744 199.831c0 62.047 28.281 117.5 72.672 154.156v70.625c0 6.891 4.109 13.125 10.453 15.813l165.5 70.203a17.16 17.16 0 0 0 16.172-1.469 17.17 17.17 0 0 0 7.703-14.313v-59.859c0-9.469 7.688-17.172 17.172-17.172h84.75c9.484 0 17.156-7.688 17.156-17.156V349.05a17.2 17.2 0 0 1 9.672-15.453l31.578-15.328c8.469-4.125 12.047-14.266 8.047-22.766m-154.859-87.75c0 4.266-2.422 9.797-5.344 12.281l-82.469 69.797c-2.922 2.484-7.75 2.484-10.688 0l-82.469-69.797c-2.938-2.484-5.344-8.016-5.344-12.281v-47.406c0-4.266 2.094-10.219 4.656-13.234l19.859-23.438c2.563-3.016 7.594-5.484 11.234-5.484h25.234c3.609 0 8.438 2.719 10.75 6.016l17.266 24.906c2.281 3.297 6.031 3.297 8.313 0l17.266-24.906c2.313-3.297 7.141-6.016 10.75-6.016h25.266c3.609 0 8.656 2.469 11.203 5.484l19.875 23.438c2.547 3.016 4.641 8.969 4.641 13.234z"/></svg>
    );
}

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