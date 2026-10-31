function Svg({
  size = 20,
  className = '',
  strokeWidth = 1.8,
  children,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function DashboardIcon(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </Svg>
  )
}

export function CheckIcon(props) {
  return (
    <Svg {...props}>
      <path d="m5 12 4 4L19 6" />
    </Svg>
  )
}

export function SparklesIcon(props) {
  return (
    <Svg {...props}>
      <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
      <path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z" />
    </Svg>
  )
}

export function ArrowUpRightIcon(props) {
  return (
    <Svg {...props}>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </Svg>
  )
}

export function InfoIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </Svg>
  )
}

/*
    InterfaceIcon
    UIIcon
    UXIcon
    UserInterfaceIcon
    UserExperienceIcon
    DashboardIcon
    LayoutIcon
    GridIcon
    GridViewIcon
    ListViewIcon
    SplitViewIcon
    SidebarIcon
    NavigationIcon
    NavbarIcon
    MenuIcon
    HamburgerMenuIcon
    ContextMenuIcon
    DropdownMenuIcon
    BreadcrumbIcon
    TabIcon
    TabsIcon
    AccordionIcon
    DrawerIcon
    ModalIcon
    DialogIcon
    PopupIcon
    PopoverIcon
    TooltipIcon
    ToastIcon
    NotificationIcon
    AlertIcon
    BannerIcon
    BadgeIcon
    ChipIcon
    TagIcon
    LabelIcon
    ButtonIcon
    PrimaryButtonIcon
    SecondaryButtonIcon
    FloatingButtonIcon
    ToggleIcon
    SwitchIcon
    CheckboxIcon
    RadioButtonIcon
    RadioGroupIcon
    SliderIcon
    RangeSliderIcon
    ProgressBarIcon
    ProgressCircleIcon
    SpinnerIcon
    LoaderIcon
    SkeletonIcon
    InputIcon
    TextInputIcon
    SearchInputIcon
    PasswordInputIcon
    TextareaIcon
    SelectIcon
    ComboboxIcon
    AutocompleteIcon
    DatePickerIcon
    TimePickerIcon
    CalendarPickerIcon
    ColorPickerIcon
    FilePickerIcon
    FileUploadIcon
    ImageUploadIcon
    FormIcon
    FormFieldIcon
    FormValidationIcon
    ErrorMessageIcon
    SuccessMessageIcon
    HelpMessageIcon
    SearchIcon
    SearchBarIcon
    FilterIcon
    SortIcon
    SortAscendingIcon
    SortDescendingIcon
    RefreshIcon
    ReloadIcon
    ResetIcon
    UndoIcon
    RedoIcon
    BackIcon
    ForwardIcon
    PreviousIcon
    NextIcon
    ChevronUpIcon
    ChevronDownIcon
    ChevronLeftIcon
    ChevronRightIcon
    ArrowUpIcon
    ArrowDownIcon
    ArrowLeftIcon
    ArrowRightIcon
    ExternalLinkIcon
    InternalLinkIcon
    LinkIcon
    UnlinkIcon
    CopyIcon
    PasteIcon
    CutIcon
    DuplicateIcon
    ShareIcon
    ExportIcon
    ImportIcon
    DownloadIcon
    UploadIcon
    SaveIcon
    EditIcon
    PencilIcon
    DeleteIcon
    TrashIcon
    RemoveIcon
    AddIcon
    PlusIcon
    MinusIcon
    CloseIcon
    XIcon
    CheckIcon
    CheckCircleIcon
    CheckSquareIcon
    MoreIcon
    MoreHorizontalIcon
    MoreVerticalIcon
    SettingsIcon
    PreferencesIcon
    CustomizeIcon
    ConfigurationIcon
    SlidersIcon
    WrenchIcon
    ToolsIcon
    EyeIcon
    EyeOffIcon
    ShowIcon
    HideIcon
    VisibilityIcon
    FullscreenIcon
    ExitFullscreenIcon
    ExpandIcon
    CollapseIcon
    MaximizeIcon
    MinimizeIcon
    ZoomInIcon
    ZoomOutIcon
    FocusIcon
    CursorIcon
    PointerIcon
    MousePointerIcon
    HandPointerIcon
    TouchIcon
    GestureIcon
    DragIcon
    DropIcon
    ResizeIcon
    MoveIcon
    SelectAreaIcon
    SelectionIcon
    TextIcon
    TypographyIcon
    HeadingIcon
    ParagraphIcon
    AlignLeftIcon
    AlignCenterIcon
    AlignRightIcon
    AlignJustifyIcon
    BoldIcon
    ItalicIcon
    UnderlineIcon
    StrikethroughIcon
    ListIcon
    OrderedListIcon
    BulletListIcon
    IndentIcon
    OutdentIcon
    QuoteIcon
    CodeIcon
    CodeBlockIcon
    ImageIcon
    GalleryIcon
    VideoIcon
    AudioIcon
    MediaPlayerIcon
    PlayIcon
    PauseIcon
    StopIcon
    SkipForwardIcon
    SkipBackIcon
    VolumeIcon
    VolumeUpIcon
    VolumeDownIcon
    VolumeMuteIcon
    MuteIcon
    UnmuteIcon
    AccessibilityIcon
    AccessibilityMenuIcon
    KeyboardNavigationIcon
    KeyboardShortcutIcon
    ScreenReaderIcon
    ContrastIcon
    DarkModeIcon
    LightModeIcon
    ThemeIcon
    ResponsiveIcon
    MobileViewIcon
    TabletViewIcon
    DesktopViewIcon
    MobileMenuIcon
    TouchscreenIcon
    DevicePreviewIcon
    WireframeIcon
    PrototypeIcon
    ComponentIcon
    ComponentsIcon
    DesignSystemIcon
    DesignTokenIcon
    StyleGuideIcon
    UIComponentIcon
    UXFlowIcon
    UserFlowIcon
    SitemapIcon
    InteractionIcon
    MicroInteractionIcon
    AnimationIcon
    TransitionIcon
    HoverIcon
    FocusStateIcon
    ActiveStateIcon
    DisabledStateIcon
    LoadingStateIcon
    EmptyStateIcon
    ErrorStateIcon
    SuccessStateIcon
    OfflineStateIcon
    OnlineStateIcon
    ConnectionStatusIcon
    NetworkStatusIcon
    BreadcrumbNavigationIcon
    PaginationIcon
    InfiniteScrollIcon
    CarouselIcon
    SliderGalleryIcon
    TableIcon
    DataTableIcon
    KanbanBoardIcon
    CardIcon
    CardLayoutIcon
    WidgetIcon
    PanelIcon
    ContainerIcon
    SectionIcon
    DividerIcon
    SeparatorIcon
    SpacerIcon
    FrameIcon
    BorderIcon
    ShadowIcon
    RoundedCornersIcon
    OpacityIcon
    TransparencyIcon
    TooltipInfoIcon
    HelpCircleIcon
    InfoCircleIcon
    WarningCircleIcon
    ErrorCircleIcon
    QuestionCircleIcon
    FeedbackIcon
    UserFeedbackIcon
    RatingIcon
    StarRatingIcon
    LikeIcon
    DislikeIcon
    ThumbsUpIcon
    ThumbsDownIcon
    FavoriteIcon
    BookmarkIcon
    PinIcon
    UnpinIcon
    HistoryIcon
    RecentItemsIcon
    ActivityIcon
    ActivityFeedIcon
    TimelineIcon
    CommandPaletteIcon
    QuickActionsIcon
    KeyboardIcon
    ShortcutIcon
    AccessibilitySettingsIcon
*/