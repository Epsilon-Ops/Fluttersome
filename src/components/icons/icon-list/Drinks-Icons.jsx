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

export function WaterSmoothIcon({ size = 20, className = '', ...props }) {
    return (
        <svg fill="currentColor" viewBox="4.172 2 15.608 20" size={size} {...props} id="water" class="icon glyph"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19.78,14.22a7.78,7.78,0,0,1-15.56,0C4.22,7.56,12,2,12,2S19.78,7.56,19.78,14.22Z"></path></g></svg>
    )
}

export function WaterSharpIcon({ size = 20, className = '', ...props }) {
    return (
        <svg fill="currentColor" viewBox="112 43.91 288 414.3" size={size} {...props}><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><title>ionicons-v5-r</title><path d="M256 43.91s-144 158.3-144 270.3c0 88.36 55.64 144 144 144s144-55.64 144-144c0-112-144-270.3-144-270.3m16 362.3v-24a60.07 60.07 0 0 0 60-60h24a84.09 84.09 0 0 1-84 84"/></svg>
    )
}

export function DropIcon({ size = 20, className = '', ...props }) {
    return (
        <svg viewBox="0 0 26 32" size={size} {...props} fill="currentColor"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><title>water</title><path d="M13 27c-3.866 0-7-3.092-7-6.906 0-3.815 4.372-7.465 7-10.094 2.733 2.697 7 6.279 7 10.094S16.866 27 13 27m0-27C8.12 4.949 0 11.82 0 19s5.82 13 13 13 13-5.82 13-13S18.077 5.077 13 0m-.033 12.505c-1.873 2.011-4.955 4.297-4.955 7.214S10.245 25 13 25s4.988-2.364 4.988-5.281-3.074-5.152-5.021-7.214" fill-rule="evenodd"/></svg>
    )
}

export function WaterPowerIcon({ size = 20, className = '', ...props }) {
    return (
        <svg viewBox="3 0.272 18 21.728" size={size} {...props} fill="currentColor"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M0 0h24v24H0z"/><path d="M5.636 6.636 12 .272l6.364 6.364a9 9 0 1 1-12.728 0M13 11V6.5L8.5 13H11v4.5l4.5-6.5z"/></svg>
    )
}

export function WaterPipeIcon({ size = 20, className = '', ...props }) {
    return (
        <svg fill="currentColor" size={size} {...props} viewBox="5.565 0 500.87 512" xml:space="preserve"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="M389.565 0H189.217C180 0 172.522 7.473 172.522 16.696s7.479 16.696 16.696 16.696h50.087V69.86c-19.391 6.914-33.391 25.273-33.391 47.01v66.783c0 27.619 22.468 50.087 50.087 50.087h66.783c27.619 0 50.087-22.468 50.087-50.087V116.87c0-21.737-14-40.096-33.391-47.01V33.391h50.087c9.217 0 16.696-7.473 16.696-16.696C406.261 7.473 398.782 0 389.565 0m-83.478 66.783h-33.391V33.391h33.391zm183.652-33.392c-9.217 0-16.696 7.473-16.696 16.696v50.087H406.26v100.174h66.783v50.087c0 9.223 7.479 16.696 16.696 16.696s16.696-7.473 16.696-16.696V50.087c0-9.223-7.479-16.696-16.696-16.696M102.098 310.983c-6.327-7.946-19.782-7.946-26.109 0-52.451 65.784-70.424 80.401-70.424 117.539C5.565 474.554 43.011 512 89.044 512c46.032 0 83.478-37.446 83.478-83.478 0-36.357-15.691-48.891-70.424-117.539M89.044 100.174c-27.619 0-50.087 22.468-50.087 50.087v100.174c0 9.223 7.479 16.696 16.696 16.696h66.783c9.217 0 16.696-7.473 16.696-16.696v-50.087h33.391V100.174z"/></svg>
    )
}

export function WaterFlaskIcon({ size = 20, className = '', ...props }) {
    return (
        <svg fill="currentColor" size={20} {...props} viewBox="88.74 0 119.519 297" xml:space="preserve"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="M105.966 62.077h85.069c5.424 0 9.821-4.397 9.821-9.821v-2.335c0-5.424-4.397-9.821-9.821-9.821h-85.069c-5.424 0-9.821 4.397-9.821 9.821v2.335c0 5.424 4.397 9.821 9.821 9.821m53.111-51.5C159.077 4.736 154.341 0 148.5 0s-10.577 4.736-10.577 10.577v15.657h21.154zm49.182 134.877V91.003c0-8.303-6.755-15.058-15.059-15.058h-89.401c-8.303 0-15.059 6.755-15.059 15.058v54.451c18.911 3.686 32.788 20.383 32.788 41.018s-13.877 37.332-32.788 41.018v54.451c0 8.303 6.755 15.059 15.059 15.059H193.2c8.303 0 15.059-6.755 15.059-15.059V227.49c-18.911-3.686-32.788-20.383-32.788-41.018s13.877-37.332 32.788-41.018"/></svg>
    )
}

export function WhiskeyIcon({ size = 20, className = '', ...props }) {
    return (
        <svg fill="currentColor" size={size} {...props} viewBox="100.75 0 302.2 503.7" xml:space="preserve"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="M384.85 139.3c-11.5-6.7-23.5-14.4-33-24.6l-7.4-7.8c-8.6-9.2-20.8-14.5-33.4-14.5h-.6V66.9c9.4-1.2 16.8-9.2 16.8-19V19.3c0-10.6-8.6-19.3-19.3-19.3h-22.7v25.2c0 4.6-3.8 8.4-8.4 8.4s-8.4-3.8-8.4-8.4V0h-25.2v25.2c0 4.6-3.8 8.4-8.4 8.4s-8.4-3.8-8.4-8.4V0h-22.7c-10.6 0-19.3 8.6-19.3 19.3v28.6c0 9.8 7.3 17.8 16.8 19v25.4h-2.5c-11.1 0-21.9 4.1-30.2 11.4l-9.5 8.4c-12 10.5-25.7 18.5-40.4 27.2-11.1 6.5-17.9 18.5-17.9 31.3v294.8c0 21.1 17.2 38.3 38.3 38.3h225.6c21.1 0 38.3-17.2 38.3-38.3V170.6c-.1-12.9-7-24.8-18.1-31.3m-91.1-72.1v25.2h-75.5V67.2zm58.7 360.3c0 9.6-7.8 17.3-17.3 17.3h-166.8c-9.6 0-17.3-7.8-17.3-17.3V210.4c0-9.6 7.8-17.3 17.3-17.3h1.7c16.6 0 31.5-7.4 39.9-19.8 9.4-13.9 25-22.2 41.8-22.2s32.4 8.3 41.8 22.2c8.4 12.4 23.3 19.8 39.9 19.8h1.7c9.6 0 17.3 7.8 17.3 17.3z"/><path d="M279.55 182.7c-6.3-9.3-16.7-14.8-27.8-14.8s-21.6 5.5-27.8 14.8c-11.5 17-31.6 27.2-53.8 27.2h-1.7l-.6 217.7 167.3.6.6-217.7-2.3-.6c-22.2 0-42.4-10.2-53.9-27.2m-78.2 64.4 50.4-30.2 50.4 30.2v51.5l-50.4 30.2-50.4-30.2zm92.4 113.9c0 4.6-3.8 8.4-8.4 8.4h-67.1c-4.6 0-8.4-3.8-8.4-8.4s3.8-8.4 8.4-8.4h67.1c4.6 0 8.4 3.7 8.4 8.4m8.4 41.9h-100.8c-4.6 0-8.4-3.8-8.4-8.4s3.8-8.4 8.4-8.4h100.7c4.6 0 8.4 3.8 8.4 8.4.1 4.7-3.7 8.4-8.3 8.4"/><path d="M285.35 289.1v-32.5l-33.6-20.2-33.6 20.2v32.5l33.6 20.1z"/></svg>
    )
}

export function StarDrinkIcon({ size = 20, className = '', ...props }) {
    return (
        <svg fill="currentColor" size={size} {...props} viewBox="150.796 0 202.015 503.608" xml:space="preserve"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="M192.201 444.08c-.101.269-.168.504-.269.772h119.741c-.092-.269-.168-.504-.26-.772-15.671-42.84-11.499-91.304 12.38-144.031 32.835-72.503 28.974-234.647 28.789-241.513a8.39 8.39 0 0 0-8.385-8.175h-.067v-7.126c0-17.937-13.413-33.188-30.527-34.698-11.289-1.007-22.159 3.836-29.066 12.338-8.419-4.583-18.885-5.305-27.799-1.889C251.282 7.722 239.758 0 226.622 0c-13.127 0-24.66 7.73-30.116 18.994a32.8 32.8 0 0 0-10.148-2.166c-8.822-.403-17.4 2.787-24.072 9.132-7.126 6.757-11.205 16.233-11.205 25.986v6.329c-.008.092-.05.168-.059.26-.176 6.866-4.046 169.01 28.798 241.513 23.88 52.72 28.043 101.184 12.381 144.032m115.636-203.129-21.815 21.823 7.244 28.966a8.39 8.39 0 0 1-2.896 8.578 8.36 8.36 0 0 1-5.254 1.847 8.5 8.5 0 0 1-3.752-.881l-29.822-14.915-29.814 14.915c-2.938 1.452-6.455 1.091-9.006-.965a8.38 8.38 0 0 1-2.896-8.578l7.244-28.966-21.823-21.823a8.4 8.4 0 0 1-2.157-8.175 8.4 8.4 0 0 1 6.06-5.901l30.426-7.604 14.982-22.486c3.114-4.667 10.853-4.667 13.967 0l14.991 22.486 30.426 7.604c2.938.73 5.246 2.988 6.052 5.901s-.017 6.033-2.157 8.174M173.844 38.131c3.307-3.139 7.462-4.835 11.659-4.532 3.878.193 7.487 1.737 10.441 4.44a8.43 8.43 0 0 0 8.788 1.62 8.41 8.41 0 0 0 5.263-7.227c.596-8.771 7.907-15.645 16.627-15.645 8.729 0 16.031 6.874 16.636 15.645a8.4 8.4 0 0 0 5.263 7.227 8.42 8.42 0 0 0 8.788-1.62c6.681-6.119 17.425-5.64 23.544.965a8.45 8.45 0 0 0 7.797 2.518 8.39 8.39 0 0 0 6.236-5.321c2.661-7.235 9.611-11.633 17.232-10.945 8.536.755 15.226 8.654 15.226 17.979v7.126H253.12c-14.605 0-26.49 11.885-26.49 26.49l-.008 81.727c0 3.198-1.57 6.094-3.844 7.764-.462.302-.94.562-1.444.764-.411.185-.806.386-1.234.487-.613.134-1.259.084-1.897.084-.613 0-1.234.05-1.821-.076-.462-.109-.873-.319-1.301-.512a8 8 0 0 1-1.393-.739c-2.283-1.679-3.853-4.574-3.853-7.772V76.85c0-14.605-11.885-26.49-26.49-26.49h-15.41a19.25 19.25 0 0 1 5.909-12.229"/><path d="m261.348 231.279-9.804-14.705-9.804 14.705a8.37 8.37 0 0 1-4.944 3.483l-19.196 4.801 14.697 14.697a8.39 8.39 0 0 1 2.207 7.974l-3.962 15.864 17.249-8.62c1.175-.596 2.468-.89 3.752-.89s2.577.294 3.752.89l17.249 8.62-3.962-15.864a8.39 8.39 0 0 1 2.207-7.974l14.697-14.697-19.196-4.801a8.38 8.38 0 0 1-4.942-3.483m69.312 256.197c-5.003-2.098-9.208-13.807-13.228-25.835H186.183c-4.029 12.028-8.226 23.737-13.236 25.835-3.685 1.553-5.766 5.473-4.977 9.392s4.239 6.74 8.234 6.74h151.208a8.394 8.394 0 0 0 3.248-16.132"/></svg>
    )
}

// WaterBottleIcon
// https://www.svgrepo.com/svg/297098/water-bottle-bottle

// WaterHandIcon
// https://www.svgrepo.com/svg/297079/water

// WaterSplashIcon
// https://www.svgrepo.com/svg/321685/water-splash

// WaterClearIcon
// https://www.svgrepo.com/svg/286091/water

// WaterH2OIcon
// https://www.svgrepo.com/svg/48779/water

// WaterDropIcon
// https://www.svgrepo.com/svg/149495/water

// WaterScaleIcon
// https://www.svgrepo.com/svg/147967/water-scale

// WaterTemperatureIcon
// https://www.svgrepo.com/svg/36391/cup-temperature

// CocaIcon
// https://www.svgrepo.com/svg/266660/water-bottle-bottle

// WhiskeyIcon
// https://www.svgrepo.com/svg/266619/whiskey

// BottleIcon
// https://www.svgrepo.com/svg/266647/water-bottle

// StarDrinkIcon
// https://www.svgrepo.com/svg/266649/beer

// WineBottleGlassIcon
// https://www.svgrepo.com/svg/265721/wine-wine-bottle

// TeaCupIcon
// https://www.svgrepo.com/svg/265738/tea-cup-coffee-cup

// BrandyDrinkIcon
// https://www.svgrepo.com/svg/245108/brandy

/*
    DrinkIcon
    DrinksIcon
    BeverageIcon
    BeveragesIcon
    WaterIcon
    GlassOfWaterIcon
    MineralWaterIcon
    SparklingWaterIcon
    StillWaterIcon
    BottleIcon
    WaterBottleIcon
    ReusableBottleIcon
    GlassIcon
    DrinkingGlassIcon
    WineGlassIcon
    ChampagneGlassIcon
    CocktailGlassIcon
    BeerGlassIcon
    MugIcon
    CupIcon
    TeacupIcon
    CoffeeCupIcon
    TravelMugIcon
    StrawIcon
    PaperStrawIcon
    IceCubeIcon
    IceCubesIcon
    IceDrinkIcon
    LemonadeIcon
    JuiceIcon
    OrangeJuiceIcon
    AppleJuiceIcon
    GrapefruitJuiceIcon
    PineappleJuiceIcon
    TomatoJuiceIcon
    SmoothieIcon
    MilkshakeIcon
    ProteinShakeIcon
    FruitShakeIcon
    MilkIcon
    ChocolateMilkIcon
    PlantMilkIcon
    AlmondMilkIcon
    SoyMilkIcon
    OatMilkIcon
    CoconutMilkIcon
    TeaIcon
    GreenTeaIcon
    BlackTeaIcon
    WhiteTeaIcon
    HerbalTeaIcon
    MatchaIcon
    ChaiTeaIcon
    IcedTeaIcon
    BubbleTeaIcon
    TeaPotIcon
    TeaBagIcon
    CoffeeIcon
    EspressoIcon
    DoubleEspressoIcon
    AmericanoIcon
    CappuccinoIcon
    LatteIcon
    MacchiatoIcon
    MochaIcon
    FlatWhiteIcon
    ColdBrewIcon
    IcedCoffeeIcon
    FrappuccinoIcon
    TurkishCoffeeIcon
    FrenchPressIcon
    PourOverIcon
    CoffeeMachineIcon
    CoffeeMakerIcon
    CoffeeGrinderIcon
    CoffeeBeansIcon
    CoffeeFilterIcon
    KettleIcon
    ElectricKettleIcon
    HotChocolateIcon
    CocoaIcon
    SodaIcon
    SoftDrinkIcon
    ColaIcon
    LemonSodaIcon
    TonicWaterIcon
    GingerAleIcon
    EnergyDrinkIcon
    SportsDrinkIcon
    ElectrolyteDrinkIcon
    KombuchaIcon
    KefirIcon
    FermentedDrinkIcon
    MocktailIcon
    CocktailIcon
    MargaritaIcon
    MojitoIcon
    MartiniIcon
    DaiquiriIcon
    PiñaColadaIcon
    BloodyMaryIcon
    SpritzIcon
    NegroniIcon
    OldFashionedIcon
    MoscowMuleIcon
    SangriaIcon
    PunchIcon
    FruitPunchIcon
    WineIcon
    RedWineIcon
    WhiteWineIcon
    RoseWineIcon
    SparklingWineIcon
    ChampagneIcon
    BeerIcon
    LagerIcon
    AleIcon
    StoutIcon
    CraftBeerIcon
    DraftBeerIcon
    BeerBottleIcon
    BeerCanIcon
    CiderIcon
    MeadIcon
    WhiskeyIcon
    BourbonIcon
    ScotchIcon
    VodkaIcon
    GinIcon
    RumIcon
    TequilaIcon
    BrandyIcon
    CognacIcon
    LiqueurIcon
    SakeIcon
    SojuIcon
    VermouthIcon
    AlcoholFreeIcon
    NonAlcoholicDrinkIcon
    DrinkMenuIcon
    BeverageMenuIcon
    BartenderIcon
    BaristaIcon
    CocktailShakerIcon
    BarSpoonIcon
    JiggerIcon
    BottleOpenerIcon
    CorkscrewIcon
    WineDecanterIcon
    WineBottleIcon
    WineBarrelIcon
    BeverageDispenserIcon
    WaterDispenserIcon
    DrinkVendingMachineIcon
    DrinkDeliveryIcon
    DrinkTakeawayIcon
    DrinkRefillIcon
    HydrationIcon
    DailyWaterIntakeIcon
    RefreshmentIcon
    CheersIcon
    ToastIcon
*/