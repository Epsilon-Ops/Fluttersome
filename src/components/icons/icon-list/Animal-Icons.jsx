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

export function EggIcon(props) {
    return (
      <Svg {...props}>
        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,22c6,0,8-6,8-9a12.675,12.675,0,0,0-4-9,6.194,6.194,0,0,0-4-2A6.194,6.194,0,0,0,8,4a12.675,12.675,0,0,0-4,9C4,16,6,22,12,22ZM16.805,8.36A9.683,9.683,0,0,1,18,13a6.9,6.9,0,0,1-.114,1.112A3.944,3.944,0,0,1,16.805,8.36ZM13,17a3.98,3.98,0,0,1,2.953,1.313A5.166,5.166,0,0,1,12,20a5.348,5.348,0,0,1-2.634-.652A4,4,0,0,1,13,17ZM9.414,5.414c.113-.113.224-.205.335-.3A3.987,3.987,0,0,1,7,12a3.913,3.913,0,0,1-.931-.122A10.848,10.848,0,0,1,9.414,5.414Z"></path></g></svg>
      </Svg>
    )
}

// LadybugIcon
// https://www.svgrepo.com/svg/297092/ladybug

// SquirrelIcon
// https://www.svgrepo.com/svg/173879/squirrel-filled-silhouette-from-side-view

// DogIcon
// https://www.svgrepo.com/show/481503/dog-13.svg

// DoggoIcon
// https://www.svgrepo.com/show/481198/dog-5.svg

// DoggiIcon
// https://www.svgrepo.com/show/364443/dog-fill.svg

// DogSquareIcon
// https://www.svgrepo.com/show/167520/dog-with-square-head-shape.svg

// DogPawHeartIcon
// https://www.svgrepo.com/show/145308/dog-pawprint-on-a-heart.svg

// DogPawsIcon
// https://www.svgrepo.com/svg/170070/dog-pawprints

// DogFoodIcon
// https://www.svgrepo.com/svg/113124/dog-dish

// DogSleepIcon
// https://www.svgrepo.com/svg/143916/dog-sleeping

// DogFirstAidIcon
// https://www.svgrepo.com/svg/94395/dog-with-first-aid-kit-bag

// DogBoneIcon
// https://www.svgrepo.com/svg/11512/dog-smelling-a-bone

// DogHouseIcon
// https://www.svgrepo.com/svg/2265/dog-house

// CatIcon
// https://www.svgrepo.com/svg/481046/cat-silhouette

// CatSilouhetteIcon
// https://www.svgrepo.com/svg/499063/cat

// KittenIcon
// https://www.svgrepo.com/svg/364323/cat-fill

// CatFoodIcon
// https://www.svgrepo.com/svg/237569/cat-food

// AnimalBuildingIcon
// https://www.svgrepo.com/svg/176400/pets-hotel-big-building

// PetHotelIcon
// https://www.svgrepo.com/svg/136868/pet-hotel

// FatLuckyCatIcon
// https://www.svgrepo.com/svg/47936/lucky-cat-toy

// PetFoodIcon
// https://www.svgrepo.com/svg/13140/pet-food-bag

// WolfIcon
// https://www.svgrepo.com/svg/481057/wolf

// WolfHeadIcon
// https://www.svgrepo.com/svg/499455/wolf-head

// FoxIcon
// https://www.svgrepo.com/svg/481148/fox-2

// SquirrelIcon
// https://www.svgrepo.com/svg/173879/squirrel-filled-silhouette-from-side-view

// AcornIcon
// https://www.svgrepo.com/svg/190991/acorn


/*
    MammalIcon
    ++ DogIcon
    ++ CatIcon
    ++ WolfIcon
    ++ FoxIcon
    BearIcon
    LionIcon
    TigerIcon
    LeopardIcon
    ElephantIcon
    GiraffeIcon
    ZebraIcon
    HorseIcon
    DonkeyIcon
    CowIcon
    BullIcon
    SheepIcon
    GoatIcon
    PigIcon
    RabbitIcon
    HamsterIcon
    MouseIcon
    RatIcon
    SquirrelIcon
    HedgehogIcon
    DeerIcon
    MooseIcon
    ReindeerIcon
    KangarooIcon
    KoalaIcon
    PandaIcon
    MonkeyIcon
    GorillaIcon
    ChimpanzeeIcon
    SlothIcon
    BatIcon
    WhaleIcon
    DolphinIcon
    SharkIcon
    SealIcon
    OctopusIcon
    SquidIcon
    JellyfishIcon
    CrabIcon
    LobsterIcon
    ShrimpIcon
    TurtleIcon
    TortoiseIcon
    CrocodileIcon
    AlligatorIcon
    SnakeIcon
    LizardIcon
    ChameleonIcon
    FrogIcon
    ToadIcon
    SalamanderIcon
    EagleIcon
    HawkIcon
    OwlIcon
    ParrotIcon
    PenguinIcon
    FlamingoIcon
    PeacockIcon
    SwanIcon
    DuckIcon
    GooseIcon
    ChickenIcon
    RoosterIcon
    TurkeyIcon
    PigeonIcon
    DoveIcon
    CrowIcon
    RavenIcon
    SparrowIcon
    RobinIcon
    WoodpeckerIcon
    HummingbirdIcon
    SeagullIcon
    OstrichIcon
    EmuIcon
    ButterflyIcon
    BeeIcon
    WaspIcon
    AntIcon
    BeetleIcon
    LadybugIcon
    DragonflyIcon
    GrasshopperIcon
    CricketIcon
    MantisIcon
    MosquitoIcon
    FlyIcon
    SpiderIcon
    ScorpionIcon
    CentipedeIcon
    SnailIcon
    SlugIcon
    WormIcon
    CaterpillarIcon
    MothIcon
    FireflyIcon
    SeahorseIcon
    StarfishIcon
    SeaUrchinIcon
    CoralIcon
    ClownfishIcon
    GoldfishIcon
    PufferfishIcon
    SalmonIcon
    TunaIcon
    SwordfishIcon
    EelIcon
    PiranhaIcon
    AngelfishIcon
    StingrayIcon
    MantaRayIcon
    AnimalPawIcon
    PawPrintIcon
    AnimalFootprintIcon
    AnimalTrackIcon
    AnimalBoneIcon
    AnimalSkullIcon
    AnimalTailIcon
    AnimalWingIcon
    AnimalFeatherIcon
    AnimalFurIcon
    AnimalHornIcon
    AnimalAntlerIcon
    AnimalClawIcon
    AnimalToothIcon
    AnimalEggIcon
    AnimalNestIcon
    AnimalCageIcon
    AnimalCarrierIcon
    PetFoodIcon
    PetBowlIcon
    PetBedIcon
    PetCollarIcon
    PetLeashIcon
    PetToyIcon
    PetHouseIcon
    BirdhouseIcon
    AquariumIcon
    FishbowlIcon
    AnimalShelterIcon
    VeterinaryIcon
    DogHouseIcon
    CatTreeIcon
*/