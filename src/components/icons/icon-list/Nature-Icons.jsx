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
  
  export function LeafIcon(props) {
    return (
      <Svg {...props}>
        <path d="M20 4C10 3 4 7 4 14a6 6 0 0 0 6 6c7 0 11-8 10-16Z" />
        <path d="M4 21c3-5 7-8 12-11" />
      </Svg>
    )
  }
  
  export function SunIcon(props) {
    return (
      <Svg {...props}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </Svg>
    )
  }
  
  export function MoonIcon(props) {
    return (
      <Svg {...props}>
        <path d="M20.985 12.486A9 9 0 0 1 11.514 3.015a9 9 0 1 0 9.471 9.471Z" />
      </Svg>
    )
  }

export function TwinBranchIcon(props) {
    return (
      <Svg {...props}>
        <svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 561.183 561.183" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M520.872,69.002c1.191-12.979-2.636-26.83-12.105-38.952c-14.765-18.89-35.197-20.192-55.361-14.023 c-22.195-22.803-60.678-19.111-80.078,5.585c-16.066-0.338-33.342,7.222-45.402,20.245c-22.99,24.827-22.305,62.914-5.761,90.621 c-16.826,16.847-23.35,41.575-14.562,64.929c7.81,20.747,27.528,33.158,48.52,35.684 c-43.595,89.49-120.597,161.005-213.074,197.998c0.8-27.246,6.561-54.378,17.597-79.829c15.427-4.011,26.708-13.46,35.382-27.414 c20.935,8.67,40.669,8.205,56.626-8.983c12.624-13.595,10.53-29.344,2.607-45.231c15.937-9.971,28.144-21.975,28.796-41.955 c0.649-19.849-11.027-32.448-25.581-42.934c27.385-37.964,13.685-63.558-37.568-74.766c-3.207-10.563-4.439-21.546-9.563-30.245 c-17.332-29.429-63.052-32.546-87.092-7.271c-4.557,4.79-10.783,8.784-17.001,11.069c-22.285,8.189-34.692,26.374-32.999,49.988 c0.188,2.632,0.024,5.284,0.024,8.421c-17.156,3.398-32.028,9.837-41.53,24.941c-9.065,14.406-7.438,29.029-1.852,43.35 c-16.01,3.166-27.34,17.605-28.038,33.909c-8.527,21.363,2.579,46.034,26.177,57.471c4.007,1.941,9.152,5.72,9.927,9.449 c2.771,13.333,8.65,23.309,17.242,30.131c-4.316,41.501,3.227,82.045,38.352,112.905c-0.082,12.485,0.334,24.982,1.428,37.463 c-0.901,18.931,0.653,38.099,5.626,57.499c0.384,1.493,1.008,2.718,1.754,3.762c2.313,5.623,8.029,8.561,16.671,7.189 c14.268-2.265,28.197-6.654,42.815-10.245c-0.261-0.339-0.51-0.657-0.771-0.991c3.913-3.044,6.186-8.385,3.374-14.048 c-8.291-16.728-14.255-34.341-17.984-52.354c66.957-33.464,126.883-79.519,176.619-134.868c5.863-0.343,11.75-0.812,17.63-1.403 c63.513,0.995,120.404-33.664,148.911-87.573c3.718-1.42,7.438-3.211,11.151-5.472c15.724-9.571,23.08-26.671,21.738-42.975 c21.109-14.986,34.61-38.866,37.336-66.133C563.892,113.454,545.589,85.457,520.872,69.002z M98.344,399.825l-6.087-6.61 c-4.358-13.072-5.59-26.969-4.786-41.167c6.557,0.322,13.342-0.314,20.673-1.053C103.856,367.104,100.629,383.411,98.344,399.825z M420.966,284.549c-18.353,16.45-42.727,23.896-67.442,27.511c11.681-15.197,22.685-30.935,32.868-47.221 c12.807,9.045,29.307,12.22,45.08,8.572C428.391,277.254,424.943,280.982,420.966,284.549z"></path> </g> </g> </g></svg>
      </Svg>
    )
}

// NatureUmbrellaIcon
// https://www.svgrepo.com/svg/286094/umbrella-ecology

// NatureBookIcon
// https://www.svgrepo.com/svg/297082/book

// NaturePlugIcon
// https://www.svgrepo.com/svg/297066/plug-energy

// NatureAppIcon
// https://www.svgrepo.com/svg/297065/smartphone-app

// SproutIcon
// https://www.svgrepo.com/svg/297067/sprout

// NatureHandIcon
// https://www.svgrepo.com/svg/297083/leaf

// NatureTagIcon
// https://www.svgrepo.com/svg/297063/tag

// NatureBatteryIcon
// https://www.svgrepo.com/svg/297077/battery

// NatureLocationIcon
// https://www.svgrepo.com/svg/297101/placeholder-leaf

// CloverIcon
// https://www.svgrepo.com/svg/297094/shamrock-clover

// TwinFlowerIcon
// https://www.svgrepo.com/svg/297081/sunflower-flower

// TwinMapleTreeIcon
// https://www.svgrepo.com/svg/297069/trees-tree

// GlobalWarmingIcon
// https://www.svgrepo.com/svg/297076/global-warming

// RecycleIcon
// https://www.svgrepo.com/svg/286095/recycle

// RecycleTruckIcon
// https://www.svgrepo.com/svg/297078/garbage-truck

// PetrolumIcon
// https://www.svgrepo.com/svg/297111/barrel-petroleum

// MountainIcon
// https://www.svgrepo.com/svg/286105/cloud-climate

// NatureCakeIcon
// https://www.svgrepo.com/svg/286106/cake

// ForestIcon
// https://www.svgrepo.com/svg/286116/forest

// LeavesIcon
// https://www.svgrepo.com/svg/286107/leaves-leaf

// EarthCycleIcon
// https://www.svgrepo.com/svg/286119/sustainable-green

// NatureEarthIcon
// https://www.svgrepo.com/svg/286120/earth-leaf

// NatureHeartIcon
// https://www.svgrepo.com/svg/286121/eco-friendly

// TwinLeafIcon
// https://www.svgrepo.com/svg/286128/leaves-leaf

// BloomflowerIcon
// https://www.svgrepo.com/svg/8060/flower-with-leeves

/*
    NatureIcon
    NaturalWorldIcon
    EnvironmentIcon
    EcologyIcon
    EcosystemIcon
    BiodiversityIcon
    ConservationIcon
    NatureConservationIcon
    EnvironmentalProtectionIcon
    SustainabilityIcon
    SustainableLivingIcon
    ClimateIcon
    ClimateChangeIcon
    GlobalWarmingIcon
    CarbonFootprintIcon
    CarbonNeutralIcon
    RenewableEnergyIcon
    SolarEnergyIcon
    WindEnergyIcon
    HydropowerIcon
    GeothermalEnergyIcon
    NaturalResourcesIcon
    RecyclingIcon
    CompostIcon
    OrganicIcon
    EcoFriendlyIcon
    GreenLivingIcon
    GreenTechnologyIcon
    PollutionIcon
    AirPollutionIcon
    WaterPollutionIcon
    SoilPollutionIcon
    PlasticPollutionIcon
    OceanPollutionIcon
    WasteManagementIcon
    WaterConservationIcon
    ForestConservationIcon
    WildlifeConservationIcon
    HabitatProtectionIcon
    ReforestationIcon
    DeforestationIcon
    NatureReserveIcon
    NationalParkIcon
    WildlifeSanctuaryIcon
    ProtectedAreaIcon
    NaturalHeritageIcon
    EarthIcon
    GlobeIcon
    PlanetEarthIcon
    WorldIcon
    ContinentsIcon
    LandscapeIcon
    SceneryIcon
    CountrysideIcon
    WildernessIcon
    OutdoorsIcon
    OutdoorAdventureIcon
    MountainIcon
    MountainsIcon
    HillIcon
    ValleyIcon
    CanyonIcon
    CliffIcon
    VolcanoIcon
    GlacierIcon
    IcebergIcon
    CaveIcon
    WaterfallIcon
    RiverIcon
    StreamIcon
    LakeIcon
    PondIcon
    OceanIcon
    SeaIcon
    BeachIcon
    CoastlineIcon
    IslandIcon
    ArchipelagoIcon
    CoralReefIcon
    CoralIcon
    SeabedIcon
    OceanFloorIcon
    ForestIcon
    WoodsIcon
    RainforestIcon
    TropicalForestIcon
    TemperateForestIcon
    BorealForestIcon
    JungleIcon
    WoodlandIcon
    TreeIcon
    TreesIcon
    OakTreeIcon
    PineTreeIcon
    PalmTreeIcon
    FirTreeIcon
    MapleTreeIcon
    WillowTreeIcon
    BirchTreeIcon
    CherryBlossomIcon
    BlossomIcon
    FlowerIcon
    FlowersIcon
    WildflowerIcon
    RoseIcon
    SunflowerIcon
    TulipIcon
    DaisyIcon
    LavenderIcon
    OrchidIcon
    LotusIcon
    HibiscusIcon
    LilyIcon
    PoppyIcon
    DandelionIcon
    PlantIcon
    PlantsIcon
    SeedlingIcon
    SproutIcon
    LeafIcon
    LeavesIcon
    AutumnLeafIcon
    MapleLeafIcon
    FernIcon
    MossIcon
    GrassIcon
    BambooIcon
    CactusIcon
    SucculentIcon
    MushroomIcon
    MushroomsIcon
    FungiIcon
    AlgaeIcon
    SeaweedIcon
    KelpIcon
    VineIcon
    IvyIcon
    RootIcon
    BranchIcon
    AcornIcon
    SeedIcon
    SeedsIcon
    PollenIcon
    PhotosynthesisIcon
    PollinationIcon
    GardeningIcon
    GardenIcon
    BotanicalGardenIcon
    GreenhouseIcon
    NurseryIcon
    AgricultureIcon
    OrganicFarmingIcon
    PermacultureIcon
    HarvestIcon
    CropIcon
    FieldIcon
    MeadowIcon
    PrairieIcon
    GrasslandIcon
    SavannaIcon
    DesertIcon
    OasisIcon
    TundraIcon
    WetlandIcon
    SwampIcon
    MarshIcon
    MangroveIcon
    RainforestCanopyIcon
    WildlifeIcon
    AnimalIcon
    AnimalsIcon
    MammalIcon
    BirdIcon
    BirdsIcon
    EagleIcon
    OwlIcon
    FalconIcon
    HawkIcon
    ParrotIcon
    PeacockIcon
    FlamingoIcon
    PenguinIcon
    SwanIcon
    DuckIcon
    GooseIcon
    StorkIcon
    HummingbirdIcon
    SparrowIcon
    CrowIcon
    RavenIcon
    WoodpeckerIcon
    KingfisherIcon
    SeagullIcon
    BatIcon
    ButterflyIcon
    MothIcon
    BeeIcon
    HoneybeeIcon
    WaspIcon
    AntIcon
    LadybugIcon
    BeetleIcon
    DragonflyIcon
    GrasshopperIcon
    CricketIcon
    FireflyIcon
    CaterpillarIcon
    SpiderIcon
    SnailIcon
    SlugIcon
    EarthwormIcon
    FrogIcon
    ToadIcon
    SalamanderIcon
    NewtIcon
    LizardIcon
    GeckoIcon
    ChameleonIcon
    SnakeIcon
    TurtleIcon
    TortoiseIcon
    CrocodileIcon
    AlligatorIcon
    DinosaurIcon
    WhaleIcon
    DolphinIcon
    SharkIcon
    OctopusIcon
    SquidIcon
    JellyfishIcon
    SeahorseIcon
    StarfishIcon
    CrabIcon
    LobsterIcon
    ShrimpIcon
    ClamIcon
    OysterIcon
    CoralFishIcon
    TropicalFishIcon
    SalmonIcon
    TroutIcon
    TunaIcon
    GoldfishIcon
    SeahorseIcon
    SealIcon
    SeaLionIcon
    WalrusIcon
    OtterIcon
    BeaverIcon
    RiverOtterIcon
    ElephantIcon
    LionIcon
    TigerIcon
    LeopardIcon
    CheetahIcon
    JaguarIcon
    GiraffeIcon
    ZebraIcon
    RhinoIcon
    HippopotamusIcon
    RhinocerosIcon
    BearIcon
    PolarBearIcon
    PandaIcon
    KoalaIcon
    KangarooIcon
    DeerIcon
    MooseIcon
    ElkIcon
    FoxIcon
    WolfIcon
    CoyoteIcon
    WildBoarIcon
    RabbitIcon
    HareIcon
    SquirrelIcon
    HedgehogIcon
    RaccoonIcon
    BadgerIcon
    LynxIcon
    MonkeyIcon
    GorillaIcon
    ChimpanzeeIcon
    OrangutanIcon
    SlothIcon
    ArmadilloIcon
    AnteaterIcon
    CamelIcon
    LlamaIcon
    AlpacaIcon
    HorseIcon
    WildHorseIcon
    CowIcon
    SheepIcon
    GoatIcon
    PigIcon
    ChickenIcon
    RoosterIcon
    TurkeyIcon
    DucklingIcon
    NaturePhotographyIcon
    WildlifePhotographyIcon
    BirdWatchingIcon
    WildlifeTrackingIcon
    AnimalFootprintIcon
    PawPrintIcon
    NestIcon
    BirdNestIcon
    BeehiveIcon
    HoneycombIcon
    AnimalHabitatIcon
    MigrationIcon
    HibernationIcon
    FoodChainIcon
    NaturalCycleIcon
    WaterCycleIcon
    CarbonCycleIcon
    WeatherIcon
    SunIcon
    SunriseIcon
    SunsetIcon
    MoonIcon
    FullMoonIcon
    StarsIcon
    NightSkyIcon
    SkyIcon
    CloudIcon
    CloudsIcon
    RainIcon
    RainfallIcon
    StormIcon
    ThunderstormIcon
    LightningIcon
    SnowIcon
    SnowfallIcon
    SnowflakeIcon
    HailIcon
    WindIcon
    BreezeIcon
    TornadoIcon
    HurricaneIcon
    RainbowIcon
    FogIcon
    MistIcon
    DewIcon
    FrostIcon
    TemperatureIcon
    ThermometerIcon
    HumidityIcon
    DroughtIcon
    FloodIcon
    NaturalDisasterIcon
    EarthquakeIcon
    TsunamiIcon
    AvalancheIcon
    LandslideIcon
    WildfireIcon
    ForestFireIcon
    FireIcon
    FireSafetyIcon
    CampingIcon
    TentIcon
    HikingIcon
    TrekkingIcon
    WalkingTrailIcon
    NatureTrailIcon
    TrailIcon
    BackpackingIcon
    PicnicIcon
    OutdoorPicnicIcon
    FishingIcon
    FlyFishingIcon
    KayakingIcon
    CanoeingIcon
    RaftingIcon
    SailingIcon
    SurfingIcon
    SnorkelingIcon
    ScubaDivingIcon
    SwimmingIcon
    MountainBikingIcon
    RockClimbingIcon
    MountaineeringIcon
    BirdwatchingIcon
    StargazingIcon
    AstronomyIcon
    TelescopeIcon
    BinocularsIcon
    NatureJournalIcon
    FieldResearchIcon
    EnvironmentalScienceIcon
    EarthScienceIcon
    GeologyIcon
    MineralIcon
    CrystalIcon
    RockIcon
    FossilIcon
    SoilIcon
    SandIcon
    ClayIcon
    WaterIcon
    FreshwaterIcon
    SaltwaterIcon
    SpringWaterIcon
    NaturalSpringIcon
    HotSpringIcon
    NaturalWonderIcon
    ScenicViewIcon
    EcoTourismIcon
    NatureEducationIcon
    EnvironmentalResearchIcon
    WildlifeResearchIcon
    BotanicalResearchIcon
    ClimateResearchIcon
    NatureExplorerIcon
    NatureLoverIcon
*/