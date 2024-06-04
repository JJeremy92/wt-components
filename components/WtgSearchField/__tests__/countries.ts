const countries = [
    { description: 'Afghanistan', code: 'AF' },
    { description: 'Albania', code: 'AL' },
    { description: 'Algeria', code: 'DZ' },
    { description: 'American Samoa', code: 'AS' },
    { description: 'Andorra', code: 'AD' },
    { description: 'Angola', code: 'AO' },
    { description: 'Anguilla', code: 'AI' },
    { description: 'Antarctica', code: 'AQ' },
    { description: 'Antigua and Barbuda', code: 'AG' },
    { description: 'Argentina', code: 'AR' },
    { description: 'Armenia', code: 'AM' },
    { description: 'Aruba', code: 'AW' },
    { description: 'Australia', code: 'AU' },
    { description: 'Austria', code: 'AT' },
    { description: 'Azerbaijan', code: 'AZ' },
    { description: 'Bahamas', code: 'BS' },
    { description: 'Bahrain', code: 'BH' },
    { description: 'Bangladesh', code: 'BD' },
    { description: 'Barbados', code: 'BB' },
    { description: 'Belarus', code: 'BY' },
    { description: 'Belgium', code: 'BE' },
    { description: 'Belize', code: 'BZ' },
    { description: 'Benin', code: 'BJ' },
    { description: 'Bermuda', code: 'BM' },
    { description: 'Bhutan', code: 'BT' },
    { description: 'Bolivia (Plurinational State of)', code: 'BO' },
    { description: 'Bonaire, Sint Eustatius and Saba', code: 'BQ' },
    { description: 'Bosnia and Herzegovina', code: 'BA' },
    { description: 'Botswana', code: 'BW' },
    { description: 'Bouvet Island', code: 'BV' },
    { description: 'Brazil', code: 'BR' },
    { description: 'British Indian Ocean Territory', code: 'IO' },
    { description: 'Brunei Darussalam', code: 'BN' },
    { description: 'Bulgaria', code: 'BG' },
    { description: 'Burkina Faso', code: 'BF' },
    { description: 'Burundi', code: 'BI' },
    { description: 'Cabo Verde', code: 'CV' },
    { description: 'Cambodia', code: 'KH' },
    { description: 'Cameroon', code: 'CM' },
    { description: 'Canada', code: 'CA' },
    { description: 'Cayman Islands', code: 'KY' },
    { description: 'Central African Republic', code: 'CF' },
    { description: 'Chad', code: 'TD' },
    { description: 'Chile', code: 'CL' },
    { description: 'China', code: 'CN' },
    { description: 'Christmas Island', code: 'CX' },
    { description: 'Cocos (Keeling) Islands', code: 'CC' },
    { description: 'Colombia', code: 'CO' },
    { description: 'Comoros', code: 'KM' },
    { description: 'Congo', code: 'CG' },
    { description: 'Cook Islands', code: 'CK' },
    { description: 'Costa Rica', code: 'CR' },
    { description: 'Croatia', code: 'HR' },
    { description: 'Cuba', code: 'CU' },
    { description: 'Curaçao', code: 'CW' },
    { description: 'Cyprus', code: 'CY' },
    { description: 'Czechia', code: 'CZ' },
    { description: 'Denmark', code: 'DK' },
    { description: 'Djibouti', code: 'DJ' },
    { description: 'Dominica', code: 'DM' },
    { description: 'Dominican Republic', code: 'DO' },
    { description: 'Ecuador', code: 'EC' },
    { description: 'Egypt', code: 'EG' },
    { description: 'El Salvador', code: 'SV' },
    { description: 'Equatorial Guinea', code: 'GQ' },
    { description: 'Eritrea', code: 'ER' },
    { description: 'Estonia', code: 'EE' },
    { description: 'Eswatini', code: 'SZ' },
    { description: 'Ethiopia', code: 'ET' },
    { description: 'Falkland Islands [Malvinas]', code: 'FK' },
    { description: 'Faroe Islands', code: 'FO' },
    { description: 'Fiji', code: 'FJ' },
    { description: 'Finland', code: 'FI' },
    { description: 'France', code: 'FR' },
    { description: 'French Guiana', code: 'GF' },
    { description: 'French Polynesia', code: 'PF' },
    { description: 'French Southern Territories', code: 'TF' },
    { description: 'Gabon', code: 'GA' },
    { description: 'Gambia', code: 'GM' },
    { description: 'Georgia', code: 'GE' },
    { description: 'Germany', code: 'DE' },
    { description: 'Ghana', code: 'GH' },
    { description: 'Gibraltar', code: 'GI' },
    { description: 'Greece', code: 'GR' },
    { description: 'Greenland', code: 'GL' },
    { description: 'Grenada', code: 'GD' },
    { description: 'Guadeloupe', code: 'GP' },
    { description: 'Guam', code: 'GU' },
    { description: 'Guatemala', code: 'GT' },
    { description: 'Guernsey', code: 'GG' },
    { description: 'Guinea', code: 'GN' },
    { description: 'Guinea-Bissau', code: 'GW' },
    { description: 'Guyana', code: 'GY' },
    { description: 'Haiti', code: 'HT' },
    { description: 'Heard Island and McDonald Islands', code: 'HM' },
    { description: 'Honduras', code: 'HN' },
    { description: 'Hong Kong', code: 'HK' },
    { description: 'Hungary', code: 'HU' },
    { description: 'Iceland', code: 'IS' },
    { description: 'India', code: 'IN' },
    { description: 'Indonesia', code: 'ID' },
    { description: 'Iran (Islamic Republic of)', code: 'IR' },
    { description: 'Iraq', code: 'IQ' },
    { description: 'Ireland', code: 'IE' },
    { description: 'Isle of Man', code: 'IM' },
    { description: 'Israel', code: 'IL' },
    { description: 'Italy', code: 'IT' },
    { description: 'Jamaica', code: 'JM' },
    { description: 'Japan', code: 'JP' },
    { description: 'Jersey', code: 'JE' },
    { description: 'Jordan', code: 'JO' },
    { description: 'Kazakhstan', code: 'KZ' },
    { description: 'Kenya', code: 'KE' },
    { description: 'Kiribati', code: 'KI' },
    { description: 'Korea', code: 'KR' },
    { description: 'Kuwait', code: 'KW' },
    { description: 'Kyrgyzstan', code: 'KG' },
    { description: 'Lao', code: 'LA' },
    { description: 'Latvia', code: 'LV' },
    { description: 'Lebanon', code: 'LB' },
    { description: 'Lesotho', code: 'LS' },
    { description: 'Liberia', code: 'LR' },
    { description: 'Libya', code: 'LY' },
    { description: 'Liechtenstein', code: 'LI' },
    { description: 'Lithuania', code: 'LT' },
    { description: 'Luxembourg', code: 'LU' },
    { description: 'Macao', code: 'MO' },
    { description: 'Madagascar', code: 'MG' },
    { description: 'Malawi', code: 'MW' },
    { description: 'Malaysia', code: 'MY' },
    { description: 'Maldives', code: 'MV' },
    { description: 'Mali', code: 'ML' },
    { description: 'Malta', code: 'MT' },
    { description: 'Marshall Islands', code: 'MH' },
    { description: 'Martinique', code: 'MQ' },
    { description: 'Mauritania', code: 'MR' },
    { description: 'Mauritius', code: 'MU' },
    { description: 'Mayotte', code: 'YT' },
    { description: 'Mexico', code: 'MX' },
    { description: 'Micronesia (Federated States of)', code: 'FM' },
    { description: 'Moldova (the Republic of)', code: 'MD' },
    { description: 'Monaco', code: 'MC' },
    { description: 'Mongolia', code: 'MN' },
    { description: 'Montenegro', code: 'ME' },
    { description: 'Montserrat', code: 'MS' },
    { description: 'Morocco', code: 'MA' },
    { description: 'Mozambique', code: 'MZ' },
    { description: 'Myanmar', code: 'MM' },
    { description: 'Namibia', code: 'NA' },
    { description: 'Nauru', code: 'NR' },
    { description: 'Nepal', code: 'NP' },
    { description: 'Netherlands', code: 'NL' },
    { description: 'New Caledonia', code: 'NC' },
    { description: 'New Zealand', code: 'NZ' },
    { description: 'Nicaragua', code: 'NI' },
    { description: 'Niger', code: 'NE' },
    { description: 'Nigeria', code: 'NG' },
    { description: 'Niue', code: 'NU' },
    { description: 'Norfolk Island', code: 'NF' },
    { description: 'Northern Mariana Islands', code: 'MP' },
    { description: 'Norway', code: 'NO' },
    { description: 'Oman', code: 'OM' },
    { description: 'Pakistan', code: 'PK' },
    { description: 'Palau', code: 'PW' },
    { description: 'Palestine, State of', code: 'PS' },
    { description: 'Panama', code: 'PA' },
    { description: 'Papua New Guinea', code: 'PG' },
    { description: 'Paraguay', code: 'PY' },
    { description: 'Peru', code: 'PE' },
    { description: 'Philippines', code: 'PH' },
    { description: 'Pitcairn', code: 'PN' },
    { description: 'Poland', code: 'PL' },
    { description: 'Portugal', code: 'PT' },
    { description: 'Puerto Rico', code: 'PR' },
    { description: 'Qatar', code: 'QA' },
    { description: 'Republic of North Macedonia', code: 'MK' },
    { description: 'Romania', code: 'RO' },
    { description: 'Russian Federation', code: 'RU' },
    { description: 'Rwanda', code: 'RW' },
    { description: 'Réunion', code: 'RE' },
    { description: 'Saint Barthélemy', code: 'BL' },
    { description: 'Saint Helena, Ascension and Tristan da Cunha', code: 'SH' },
    { description: 'Saint Kitts and Nevis', code: 'KN' },
    { description: 'Saint Lucia', code: 'LC' },
    { description: 'Saint Martin (French part)', code: 'MF' },
    { description: 'Saint Pierre and Miquelon', code: 'PM' },
    { description: 'Saint Vincent and the Grenadines', code: 'VC' },
    { description: 'Samoa', code: 'WS' },
    { description: 'San Marino', code: 'SM' },
    { description: 'Sao Tome and Principe', code: 'ST' },
    { description: 'Saudi Arabia', code: 'SA' },
    { description: 'Senegal', code: 'SN' },
    { description: 'Serbia', code: 'RS' },
    { description: 'Seychelles', code: 'SC' },
    { description: 'Sierra Leone', code: 'SL' },
    { description: 'Singapore', code: 'SG' },
    { description: 'Sint Maarten (Dutch part)', code: 'SX' },
    { description: 'Slovakia', code: 'SK' },
    { description: 'Slovenia', code: 'SI' },
    { description: 'Solomon Islands', code: 'SB' },
    { description: 'Somalia', code: 'SO' },
    { description: 'South Africa', code: 'ZA' },
    { description: 'South Georgia and the South Sandwich Islands', code: 'GS' },
    { description: 'South Sudan', code: 'SS' },
    { description: 'Spain', code: 'ES' },
    { description: 'Sri Lanka', code: 'LK' },
    { description: 'Sudan', code: 'SD' },
    { description: 'Suriname', code: 'SR' },
    { description: 'Svalbard and Jan Mayen', code: 'SJ' },
    { description: 'Sweden', code: 'SE' },
    { description: 'Switzerland', code: 'CH' },
    { description: 'Syrian Arab Republic', code: 'SY' },
    { description: 'Taiwan (Province of China)', code: 'TW' },
    { description: 'Tajikistan', code: 'TJ' },
    { description: 'Tanzania, United Republic of', code: 'TZ' },
    { description: 'Thailand', code: 'TH' },
    { description: 'Timor-Leste', code: 'TL' },
    { description: 'Togo', code: 'TG' },
    { description: 'Tokelau', code: 'TK' },
    { description: 'Tonga', code: 'TO' },
    { description: 'Trinidad and Tobago', code: 'TT' },
    { description: 'Tunisia', code: 'TN' },
    { description: 'Turkey', code: 'TR' },
    { description: 'Turkmenistan', code: 'TM' },
    { description: 'Turks and Caicos Islands', code: 'TC' },
    { description: 'Tuvalu', code: 'TV' },
    { description: 'Uganda', code: 'UG' },
    { description: 'Ukraine', code: 'UA' },
    { description: 'United Arab Emirates', code: 'AE' },
    { description: 'United Kingdom of Great Britain and Northern Ireland', code: 'GB' },
    { description: 'United States Minor Outlying Islands', code: 'UM' },
    { description: 'United States of America', code: 'US' },
    { description: 'Uruguay', code: 'UY' },
    { description: 'Uzbekistan', code: 'UZ' },
    { description: 'Vanuatu', code: 'VU' },
    { description: 'Venezuela (Bolivarian Republic of)', code: 'VE' },
    { description: 'Viet Nam', code: 'VN' },
    { description: 'Virgin Islands (British)', code: 'VG' },
    { description: 'Virgin Islands (U.S.)', code: 'VI' },
    { description: 'Wallis and Futuna', code: 'WF' },
    { description: 'Western Sahara', code: 'EH' },
    { description: 'Yemen', code: 'YE' },
    { description: 'Zambia', code: 'ZM' },
    { description: 'Zimbabwe', code: 'ZW' },
];

export default countries;
