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


export function Money1Icon(props) {
  return (
    <Svg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        stroke="none"
        d="M2.58579 5.58579C2 6.17157 2 7.11438 2 9V15C2 16.8856 2 17.8284 2.58579 18.4142C3.17157 19 4.11438 19 6 19H18C19.8856 19 20.8284 19 21.4142 18.4142C22 17.8284 22 16.8856 22 15V9C22 7.11438 22 6.17157 21.4142 5.58579C20.8284 5 19.8856 5 18 5H6C4.11438 5 3.17157 5 2.58579 5.58579ZM5 7C4.44772 7 4 7.44772 4 8C4 8.55228 4.44772 9 5 9H7C7.55228 9 8 8.55228 8 8C8 7.44772 7.55228 7 7 7H5ZM16 16C16 15.4477 16.4477 15 17 15H19C19.5523 15 20 15.4477 20 16C20 16.5523 19.5523 17 19 17H17C16.4477 17 16 16.5523 16 16ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
      />
    </Svg>
  );
}

export function Money2Icon(props) {
  return (
    <Svg {...props}>
      <ellipse
        cx="12"
        cy="12"
        rx="6"
        ry="4"
        fill="currentColor"
        stroke="none"
      />
      <path
        fill="currentColor"
        stroke="none"
        d="M18.75 19H20c1.2 0 2-.8 2-2v-1.25c-1.8 0-3.25 1.45-3.25 3.25ZM5.25 5H4c-1.2 0-2 .8-2 2v1.25C3.8 8.25 5.25 6.8 5.25 5ZM22 8.25V7c0-1.2-.8-2-2-2h-1.25c0 1.8 1.45 3.25 3.25 3.25ZM17.25 5h-10C7.25 7.5 5.5 9.25 3 9.25v5.5c2.5 0 4.25 1.75 4.25 4.25h10c0-2.5 1.75-4.25 4.25-4.25v-5.5C19 9.25 17.25 7.5 17.25 5Z"
      />
    </Svg>
  );
}

export function DollarIcon(props) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        stroke="none"
        d="M20 4H4A2 2 0 0 0 2 6V18a2 2 0 0 0 2 2H20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-8.5 7h1A2.5 2.5 0 0 1 13 16v0a1 1 0 0 1-2 0H10a1 1 0 0 1 0-2h2.5a.5.5 0 0 0 0-1h-1A2.5 2.5 0 0 1 11 8.05V8a1 1 0 0 1 2 0h1a1 1 0 0 1 0 2H11.5a.5.5 0 0 0 0 1Z"
      />
    </Svg>
  );
}

export function MoneyCardIcon(props) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        stroke="none"
        d="M23.25 0H.75C.35 0 0 .35 0 .75v4.25h24V.75c0-.4-.35-.75-.75-.75ZM0 7v7.25c0 .4.35.75.75.75h22.5c.4 0 .75-.35.75-.75V7H0Z"
      />
    </Svg>
  );
}

export function MastercardCardIcon(props) {
  return (
    <Svg {...props}>
      <rect x="1" y="4" width="22" height="16" rx="2" fill="currentColor" stroke="none" />
      <circle cx="10" cy="12" r="4" fill="#413b3c" stroke="none" />
      <circle cx="14" cy="12" r="4" fill="#575654" stroke="none" />
    </Svg>
  );
}

export function CardLayoutIcon(props) {
  return (
    <Svg {...props}>
      <g fill="currentColor" stroke="none">
        <path d="M2 2h6v7H2zM16 10h6v7h-6zM10 2h12v7H10zM2 10h12v7H2z" />
      </g>
    </Svg>
  );
}

export function DoubleCardIcon(props) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        stroke="none"
        d="M16 4H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-6 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm12-2v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1h10a3 3 0 0 0 3-3V8h1a2 2 0 0 1 2 2Z"
      />
    </Svg>
  );
}

export function DoubleCoinIcon(props) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        stroke="none"
        d="M21.92 16.75a5.2 5.2 0 0 1-5.17 5.17 5.2 5.2 0 0 1-4.28-1.1c-.67-.49-.51-1.53.29-1.77 3.01-.91 5.38-3.29 6.3-6.3.24-.79 1.28-.95 1.77-.29a5.2 5.2 0 0 1 1.09 4.29ZM9.99 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm-.94 6.87 2.41.84c.87.31 1.29.92 1.29 1.86 0 1.08-.86 1.97-1.91 1.97h-.09v.05a.75.75 0 0 1-1.5 0v-.06a2 2 0 0 1-1.75-2.14.75.75 0 0 1 1.5 0c0 .36.26.65.58.65h1.5c.23 0 .41-.21.41-.47 0-.35-.06-.37-.29-.45l-2.41-.84c-.86-.3-1.29-.91-1.29-1.86 0-1.08.86-1.97 1.91-1.97H9.5v-.04a.75.75 0 0 1 1.5 0v.06a2 2 0 0 1 1.75 2.14.75.75 0 0 1-1.5 0c0-.36-.26-.65-.58-.65h-1.5c-.23 0-.41.21-.41.47 0 .34.05.36.29.44Z"
      />
    </Svg>
  );
}


export function CloverCoinIcon(props) {
  return (
    <Svg {...props}>
      <g fill="currentColor" stroke="none">
        <path d="M16.38 12l.48-.5c.18-.18.27-.42.27-.67 0-.54-.44-.98-.98-.98-.41 0-.84.09-1.28.27L13 12l1.87 1.87c.44.18.87.27 1.28.27.54 0 .98-.44.98-.98 0-.25-.1-.49-.27-.67l-.48-.49Z" />
        <path d="M13.87 14.3L12 12.43l-1.87 1.87c-.18.44-.27.87-.27 1.28 0 .54.44.98.98.98.25 0 .49-.1.67-.27l.5-.48.49.48c.18.18.42.27.67.27.54 0 .98-.44.98-.98 0-.41-.09-.84-.27-1.28Z" />
        <path d="M9.12 9.7c-.44-.18-.87-.27-1.28-.27-.54 0-.98.44-.98.98 0 .25.1.49.27.67l.48.5-.48.49c-.18.18-.27.42-.27.67 0 .54.44.98.98.98.41 0 .84-.09 1.28-.27L11 12 9.12 9.7Z" />
        <path d="M13.17 6.73c-.25 0-.49.1-.67.27l-.5.48-.49-.48c-.18-.18-.42-.27-.67-.27-.54 0-.98.44-.98.98 0 .41.09.84.27 1.28L12 10.86l1.87-1.87c.18-.44.27-.87.27-1.28 0-.54-.44-.98-.98-.98Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 3.35a8.65 8.65 0 1 0 0 17.3 8.65 8.65 0 0 0 0-17.3Zm4.16 12.25c-.21 0-.42-.02-.64-.05.03.21.05.43.05.64a2.4 2.4 0 0 1-2.4 2.4c-.42 0-.82-.1-1.17-.3-.36.2-.76.3-1.18.3a2.4 2.4 0 0 1-2.4-2.4c0-.21.02-.43.05-.64-.22.03-.43.05-.64.05a2.4 2.4 0 0 1-2.4-2.4c0-.42.1-.82.3-1.18-.2-.35-.3-.75-.3-1.17a2.4 2.4 0 0 1 2.4-2.4c.21 0 .42.02.64.05-.03-.22-.05-.43-.05-.64a2.4 2.4 0 0 1 2.4-2.4c.42 0 .82.1 1.18.3.35-.2.75-.3 1.17-.3a2.4 2.4 0 0 1 2.4 2.4c0 .21-.02.42-.05.64.22-.03.43-.05.64-.05a2.4 2.4 0 0 1 2.4 2.4c0 .42-.1.82-.3 1.17.2.36.3.76.3 1.18a2.4 2.4 0 0 1-2.4 2.4Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 1.5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21Zm0 20a9.5 9.5 0 1 1 0-19 9.5 9.5 0 0 1 0 19Z"
        />
      </g>
    </Svg>
  );
}

/*
    FinanceIconc
    FinancialIcon
    MoneyIcon
    CashIcon
    BanknoteIcon
    CoinIcon
    CoinsIcon
    MoneyBagIcon
    WalletIcon
    DigitalWalletIcon
    PiggyBankIcon
    SavingsIcon
    SavingsAccountIcon
    BankIcon
    BankingIcon
    CentralBankIcon
    InvestmentBankIcon
    OnlineBankingIcon
    MobileBankingIcon
    InternetBankingIcon
    ATMIcon
    CashMachineIcon
    VaultIcon
    SafeIcon
    CreditCardIcon
    DebitCardIcon
    PaymentCardIcon
    ContactlessPaymentIcon
    PaymentIcon
    OnlinePaymentIcon
    MobilePaymentIcon
    DigitalPaymentIcon
    PaymentGatewayIcon
    PaymentTerminalIcon
    POSIcon
    CashRegisterIcon
    ReceiptIcon
    InvoiceIcon
    BillIcon
    TransactionIcon
    MoneyTransferIcon
    BankTransferIcon
    WireTransferIcon
    InternationalTransferIcon
    PeerToPeerPaymentIcon
    CurrencyIcon
    CurrencyExchangeIcon
    ForeignExchangeIcon
    ExchangeRateIcon
    ForexIcon
    CurrencyConverterIcon
    CurrencyPairIcon
    DollarIcon
    EuroIcon
    PoundIcon
    YenIcon
    YuanIcon
    FrancIcon
    RupeeIcon
    RubleIcon
    WonIcon
    BitcoinIcon
    EthereumIcon
    CryptocurrencyIcon
    BlockchainIcon
    DigitalCurrencyIcon
    StablecoinIcon
    TokenIcon
    CryptoWalletIcon
    CryptoExchangeIcon
    DeFiIcon
    NFTIcon
    InvestmentIcon
    InvestmentPortfolioIcon
    PortfolioManagementIcon
    AssetManagementIcon
    WealthManagementIcon
    WealthBuildingIcon
    FinancialPlanningIcon
    FinancialAdvisorIcon
    FinancialConsultingIcon
    FinancialLiteracyIcon
    PersonalFinanceIcon
    BusinessFinanceIcon
    CorporateFinanceIcon
    PublicFinanceIcon
    FinancialManagementIcon
    FinancialAnalysisIcon
    FinancialAnalyticsIcon
    FinancialDashboardIcon
    FinancialReportIcon
    FinancialStatementIcon
    AccountingIcon
    BookkeepingIcon
    AuditIcon
    TaxIcon
    TaxReturnIcon
    TaxPaymentIcon
    TaxPlanningIcon
    TaxCalculatorIcon
    CalculatorIcon
    FinancialCalculatorIcon
    BudgetIcon
    BudgetPlanningIcon
    ExpenseIcon
    ExpenseTrackingIcon
    IncomeIcon
    RevenueIcon
    ProfitIcon
    LossIcon
    CashFlowIcon
    CashFlowManagementIcon
    BalanceSheetIcon
    ProfitAndLossIcon
    FinancialForecastIcon
    FinancialProjectionIcon
    FinancialGoalIcon
    EmergencyFundIcon
    DebtIcon
    DebtManagementIcon
    LoanIcon
    PersonalLoanIcon
    BusinessLoanIcon
    MortgageIcon
    HomeLoanIcon
    InterestRateIcon
    CompoundInterestIcon
    CreditScoreIcon
    CreditRatingIcon
    CreditReportIcon
    CreditRiskIcon
    RiskManagementIcon
    FinancialSecurityIcon
    FraudDetectionIcon
    InsuranceIcon
    LifeInsuranceIcon
    HealthInsuranceIcon
    CarInsuranceIcon
    PropertyInsuranceIcon
    PensionIcon
    RetirementIcon
    RetirementPlanningIcon
    AnnuityIcon
    StockMarketIcon
    StockTradingIcon
    TradingIcon
    TraderIcon
    StockExchangeIcon
    StocksIcon
    SharesIcon
    BondsIcon
    GovernmentBondsIcon
    MutualFundIcon
    IndexFundIcon
    ETFIcon
    HedgeFundIcon
    PrivateEquityIcon
    VentureCapitalIcon
    AngelInvestmentIcon
    StartupFundingIcon
    CrowdfundingIcon
    DividendIcon
    CapitalGainIcon
    CapitalLossIcon
    MarketAnalysisIcon
    MarketTrendIcon
    BullMarketIcon
    BearMarketIcon
    MarketVolatilityIcon
    MarketCrashIcon
    InflationIcon
    DeflationIcon
    RecessionIcon
    EconomicGrowthIcon
    EconomyIcon
    GlobalEconomyIcon
    MonetaryPolicyIcon
    FiscalPolicyIcon
    FinancialCrisisIcon
    FinancialRegulationIcon
    ComplianceIcon
    KYCIcon
    AMLIcon
    FinancialTechnologyIcon
    FintechIcon
    OpenBankingIcon
    EmbeddedFinanceIcon
    MicrofinanceIcon
    FinancialInclusionIcon
    InternationalFinanceIcon
    GlobalPaymentsIcon
    RemittanceIcon
    EscrowIcon
    MerchantServicesIcon
    FinancialServicesIcon
    FinancialInstitutionIcon
    FinancialEducationIcon
    MoneyManagementIcon
    WealthTrackerIcon
    NetWorthIcon
    FinancialIndependenceIcon
    FinancialFreedomIcon
    FinancialGrowthIcon
    FinancialSuccessIcon
*/