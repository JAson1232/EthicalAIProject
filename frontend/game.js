const PATIENTS_DATA = [{"id":1,"name":"Maria Garcia","age":67,"gender":"Female","occupation":"Retired Teacher","medical_history":"Diabetes, hypertension","symptoms":"Severe chest pain, difficulty breathing","actual_severity":85,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-2,"public_opinion":1,"reputation":2,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-3,"reputation":-4,"staff_morale":-2}},"ai_score":65},{"id":2,"name":"David Chen","age":28,"gender":"Male","occupation":"Software Engineer","medical_history":"No significant history","symptoms":"Moderate fever, cough","actual_severity":35,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":0,"reputation":0,"staff_morale":0},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":0,"reputation":0,"staff_morale":0}},"ai_score":60},{"id":3,"name":"James Wilson","age":52,"gender":"Male","occupation":"Unemployed","medical_history":"Chronic alcoholism, liver disease","symptoms":"Severe abdominal pain, jaundice","actual_severity":80,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-3,"public_opinion":-1,"reputation":1,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":0,"reputation":-3,"staff_morale":-2}},"ai_score":65},{"id":4,"name":"Aisha Mohammed","age":34,"gender":"Female","occupation":"Nurse","medical_history":"Asthma","symptoms":"Severe respiratory distress","actual_severity":75,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-2,"public_opinion":2,"reputation":3,"staff_morale":3},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-4,"reputation":-5,"staff_morale":-5}},"ai_score":75},{"id":5,"name":"Robert Thompson","age":45,"gender":"Male","occupation":"Construction Worker","medical_history":"Back injury, chronic pain","symptoms":"Workplace accident, fractured ribs","actual_severity":60,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-2,"public_opinion":1,"reputation":1,"staff_morale":0},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-2,"reputation":-2,"staff_morale":-1}},"ai_score":50},{"id":6,"name":"Emily Davidson","age":29,"gender":"Female","occupation":"Marketing Manager","medical_history":"Anxiety disorder","symptoms":"Panic attack, elevated heart rate","actual_severity":30,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":0,"reputation":0,"staff_morale":-1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":0,"reputation":0,"staff_morale":0}},"ai_score":55},{"id":7,"name":"Carlos Rodriguez","age":71,"gender":"Male","occupation":"Retired Factory Worker","medical_history":"Heart disease, stroke survivor","symptoms":"Stroke-like symptoms, paralysis","actual_severity":90,"outcome_weights":{"admit":{"icu_beds":-3,"medicine":-3,"public_opinion":1,"reputation":2,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-3,"reputation":-5,"staff_morale":-3}},"ai_score":60},{"id":8,"name":"Sophie Laurent","age":26,"gender":"Female","occupation":"Medical Student","medical_history":"Healthy","symptoms":"Minor car accident, whiplash","actual_severity":25,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":0,"reputation":0,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":0,"reputation":0,"staff_morale":0}},"ai_score":40},{"id":9,"name":"Marcus Johnson","age":38,"gender":"Male","occupation":"Homeless","medical_history":"Malnutrition, tuberculosis","symptoms":"Pneumonia, severe coughing","actual_severity":70,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-2,"public_opinion":-1,"reputation":2,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-1,"reputation":-2,"staff_morale":-2}},"ai_score":55},{"id":10,"name":"Linda Park","age":55,"gender":"Female","occupation":"CEO","medical_history":"High cholesterol","symptoms":"Suspected heart attack","actual_severity":65,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-2,"public_opinion":1,"reputation":2,"staff_morale":0},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-2,"reputation":-3,"staff_morale":-1}},"ai_score":75},{"id":11,"name":"Ahmed Hassan","age":42,"gender":"Male","occupation":"Taxi Driver","medical_history":"Diabetes","symptoms":"Diabetic emergency, confusion","actual_severity":55,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-2,"public_opinion":0,"reputation":1,"staff_morale":0},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-1,"reputation":-2,"staff_morale":-1}},"ai_score":45},{"id":12,"name":"Grace Williams","age":19,"gender":"Female","occupation":"College Student","medical_history":"Depression","symptoms":"Suicide attempt, overdose","actual_severity":85,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-3,"public_opinion":2,"reputation":3,"staff_morale":2},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-5,"reputation":-6,"staff_morale":-4}},"ai_score":100},{"id":13,"name":"Thomas Brown","age":68,"gender":"Male","occupation":"Retired Veteran","medical_history":"PTSD, chronic pain","symptoms":"Fall injury, possible fracture","actual_severity":50,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-2,"public_opinion":2,"reputation":2,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-3,"reputation":-3,"staff_morale":-2}},"ai_score":30},{"id":14,"name":"Priya Patel","age":31,"gender":"Female","occupation":"Data Scientist","medical_history":"None","symptoms":"Allergic reaction, difficulty breathing","actual_severity":70,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-2,"public_opinion":1,"reputation":1,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-2,"reputation":-3,"staff_morale":-2}},"ai_score":70},{"id":15,"name":"Kevin O'Brien","age":49,"gender":"Male","occupation":"Factory Worker","medical_history":"Lung disease","symptoms":"Industrial chemical exposure","actual_severity":75,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-3,"public_opinion":1,"reputation":1,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-2,"reputation":-3,"staff_morale":-2}},"ai_score":65},{"id":16,"name":"Jessica Martinez","age":36,"gender":"Female","occupation":"Teacher","medical_history":"Asthma","symptoms":"Severe asthma attack","actual_severity":60,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-2,"public_opinion":2,"reputation":2,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-3,"reputation":-3,"staff_morale":-2}},"ai_score":60},{"id":17,"name":"William Turner","age":72,"gender":"Male","occupation":"Retired","medical_history":"Dementia, heart condition","symptoms":"Heart failure symptoms","actual_severity":80,"outcome_weights":{"admit":{"icu_beds":-3,"medicine":-3,"public_opinion":0,"reputation":1,"staff_morale":0},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-2,"reputation":-4,"staff_morale":-2}},"ai_score":60},{"id":18,"name":"Nina Kowalski","age":27,"gender":"Female","occupation":"Software Developer","medical_history":"Migraines","symptoms":"Severe migraine, vision problems","actual_severity":40,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":0,"reputation":0,"staff_morale":0},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":0,"reputation":0,"staff_morale":0}},"ai_score":55},{"id":19,"name":"Jerome Washington","age":58,"gender":"Male","occupation":"Janitor","medical_history":"Hypertension, obesity","symptoms":"Chest pain, sweating","actual_severity":65,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-2,"public_opinion":0,"reputation":1,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-1,"reputation":-2,"staff_morale":-1}},"ai_score":65},{"id":20,"name":"Olivia Anderson","age":33,"gender":"Female","occupation":"Lawyer","medical_history":"None","symptoms":"Appendicitis symptoms","actual_severity":55,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-2,"public_opinion":1,"reputation":1,"staff_morale":0},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-1,"reputation":-2,"staff_morale":-1}},"ai_score":65},{"id":21,"name":"Frank Sullivan","age":63,"gender":"Male","occupation":"Unemployed","medical_history":"Substance abuse, hepatitis","symptoms":"Liver failure symptoms","actual_severity":70,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-3,"public_opinion":-1,"reputation":1,"staff_morale":0},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":0,"reputation":-2,"staff_morale":-2}},"ai_score":55},{"id":22,"name":"Zara Ali","age":24,"gender":"Female","occupation":"Graphic Designer","medical_history":"Healthy","symptoms":"Broken leg from sports injury","actual_severity":35,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":0,"reputation":0,"staff_morale":0},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":0,"reputation":0,"staff_morale":0}},"ai_score":50},{"id":23,"name":"Harold Peterson","age":76,"gender":"Male","occupation":"Retired Professor","medical_history":"Cancer survivor, diabetes","symptoms":"Pneumonia, high fever","actual_severity":75,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-3,"public_opinion":1,"reputation":2,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-2,"reputation":-4,"staff_morale":-2}},"ai_score":55},{"id":24,"name":"Michelle Lee","age":40,"gender":"Female","occupation":"Restaurant Server","medical_history":"None","symptoms":"Severe burns from kitchen accident","actual_severity":80,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-3,"public_opinion":1,"reputation":2,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-2,"reputation":-3,"staff_morale":-2}},"ai_score":80},{"id":25,"name":"Daniel Foster","age":35,"gender":"Male","occupation":"Investment Banker","medical_history":"High stress","symptoms":"Chest discomfort, stress-related","actual_severity":30,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":0,"reputation":1,"staff_morale":-1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":0,"reputation":0,"staff_morale":0}},"ai_score":30},{"id":26,"name":"Rosa Hernandez","age":51,"gender":"Female","occupation":"Housekeeper","medical_history":"Arthritis, back pain","symptoms":"Severe back injury","actual_severity":45,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":0,"reputation":1,"staff_morale":0},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-1,"reputation":-1,"staff_morale":-1}},"ai_score":45},{"id":27,"name":"Christopher Wright","age":69,"gender":"Male","occupation":"Retired Mechanic","medical_history":"Emphysema, heart disease","symptoms":"Respiratory failure","actual_severity":85,"outcome_weights":{"admit":{"icu_beds":-3,"medicine":-3,"public_opinion":0,"reputation":1,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-2,"reputation":-4,"staff_morale":-2}},"ai_score":65},{"id":28,"name":"Samantha Green","age":29,"gender":"Female","occupation":"PhD Student","medical_history":"Anxiety","symptoms":"Lab accident, chemical burn","actual_severity":60,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-2,"public_opinion":1,"reputation":2,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-2,"reputation":-2,"staff_morale":-1}},"ai_score":75},{"id":29,"name":"Ramon Santos","age":44,"gender":"Male","occupation":"Delivery Driver","medical_history":"None","symptoms":"Traffic accident, internal bleeding","actual_severity":90,"outcome_weights":{"admit":{"icu_beds":-3,"medicine":-3,"public_opinion":1,"reputation":2,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-3,"reputation":-5,"staff_morale":-3}},"ai_score":80},{"id":30,"name":"Victoria Black","age":37,"gender":"Female","occupation":"Physician","medical_history":"Healthy","symptoms":"Exposure to infectious patient","actual_severity":50,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-2,"public_opinion":2,"reputation":3,"staff_morale":3},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-3,"reputation":-4,"staff_morale":-4}},"ai_score":50},{"id":31,"name":"Gary Mitchell","age":59,"gender":"Male","occupation":"Unemployed","medical_history":"Drug addiction, HIV","symptoms":"Overdose","actual_severity":65,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-2,"public_opinion":-1,"reputation":0,"staff_morale":0},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":0,"reputation":-2,"staff_morale":-2}},"ai_score":50},{"id":32,"name":"Emma Thompson","age":22,"gender":"Female","occupation":"Intern","medical_history":"None","symptoms":"Severe dehydration, exhaustion","actual_severity":40,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":0,"reputation":0,"staff_morale":0},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":0,"reputation":0,"staff_morale":0}},"ai_score":55},{"id":33,"name":"Walter Jackson","age":74,"gender":"Male","occupation":"Retired Bus Driver","medical_history":"Parkinson's disease","symptoms":"Fall, head trauma","actual_severity":70,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-2,"public_opinion":1,"reputation":1,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-2,"reputation":-3,"staff_morale":-2}},"ai_score":40},{"id":34,"name":"Lisa Kumar","age":32,"gender":"Female","occupation":"Pharmacist","medical_history":"Diabetes","symptoms":"Diabetic ketoacidosis","actual_severity":75,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-2,"public_opinion":2,"reputation":2,"staff_morale":2},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-3,"reputation":-4,"staff_morale":-3}},"ai_score":75},{"id":35,"name":"Brian Hughes","age":47,"gender":"Male","occupation":"Security Guard","medical_history":"Hypertension","symptoms":"Assault victim, multiple injuries","actual_severity":55,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-2,"public_opinion":1,"reputation":1,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-1,"reputation":-2,"staff_morale":-1}},"ai_score":55},{"id":36,"name":"Angela Davis","age":54,"gender":"Female","occupation":"Social Worker","medical_history":"Breast cancer survivor","symptoms":"Suspected cancer recurrence","actual_severity":60,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-2,"public_opinion":2,"reputation":2,"staff_morale":2},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-3,"reputation":-3,"staff_morale":-2}},"ai_score":60},{"id":37,"name":"Timothy Rogers","age":70,"gender":"Male","occupation":"Retired Postal Worker","medical_history":"Diabetes, kidney disease","symptoms":"Kidney failure","actual_severity":80,"outcome_weights":{"admit":{"icu_beds":-3,"medicine":-3,"public_opinion":0,"reputation":1,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-2,"reputation":-4,"staff_morale":-2}},"ai_score":60},{"id":38,"name":"Maya Cohen","age":26,"gender":"Female","occupation":"Journalist","medical_history":"Healthy","symptoms":"Assault while covering protest","actual_severity":50,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":3,"reputation":2,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-4,"reputation":-3,"staff_morale":-2}},"ai_score":65},{"id":39,"name":"Joseph King","age":61,"gender":"Male","occupation":"Truck Driver","medical_history":"Sleep apnea, obesity","symptoms":"Fatigue-related accident","actual_severity":45,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":0,"reputation":0,"staff_morale":0},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-1,"reputation":-1,"staff_morale":-1}},"ai_score":35},{"id":40,"name":"Sarah Nguyen","age":30,"gender":"Female","occupation":"Architect","medical_history":"None","symptoms":"Pregnancy complications","actual_severity":85,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-3,"public_opinion":3,"reputation":3,"staff_morale":2},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-5,"reputation":-6,"staff_morale":-4}},"ai_score":85},{"id":41,"name":"Richard Bell","age":66,"gender":"Male","occupation":"Retired","medical_history":"Alzheimer's disease","symptoms":"Wandered outside, hypothermia","actual_severity":70,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-2,"public_opinion":1,"reputation":1,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-3,"reputation":-3,"staff_morale":-2}},"ai_score":50},{"id":42,"name":"Jasmine Taylor","age":25,"gender":"Female","occupation":"Barista","medical_history":"Asthma","symptoms":"Minor burns, smoke inhalation","actual_severity":35,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":0,"reputation":0,"staff_morale":0},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":0,"reputation":0,"staff_morale":0}},"ai_score":50},{"id":43,"name":"Albert Costa","age":73,"gender":"Male","occupation":"Retired Electrician","medical_history":"Pacemaker, heart failure","symptoms":"Pacemaker malfunction","actual_severity":95,"outcome_weights":{"admit":{"icu_beds":-3,"medicine":-3,"public_opinion":1,"reputation":2,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-3,"reputation":-6,"staff_morale":-3}},"ai_score":75},{"id":44,"name":"Rachel Kim","age":34,"gender":"Female","occupation":"Paramedic","medical_history":"None","symptoms":"Injured on duty, broken arm","actual_severity":40,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":2,"reputation":2,"staff_morale":3},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-3,"reputation":-3,"staff_morale":-4}},"ai_score":40},{"id":45,"name":"Dennis Moore","age":56,"gender":"Male","occupation":"Warehouse Worker","medical_history":"Back problems","symptoms":"Forklift accident, crushed leg","actual_severity":75,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-2,"public_opinion":1,"reputation":1,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-2,"reputation":-3,"staff_morale":-2}},"ai_score":75},{"id":46,"name":"Patricia White","age":48,"gender":"Female","occupation":"Accountant","medical_history":"Migraines","symptoms":"Severe headache, vision loss","actual_severity":65,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-2,"public_opinion":1,"reputation":1,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-2,"reputation":-2,"staff_morale":-1}},"ai_score":65},{"id":47,"name":"George Adams","age":75,"gender":"Male","occupation":"Retired Judge","medical_history":"Multiple conditions","symptoms":"Multiple organ failure","actual_severity":90,"outcome_weights":{"admit":{"icu_beds":-3,"medicine":-4,"public_opinion":1,"reputation":2,"staff_morale":0},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-2,"reputation":-5,"staff_morale":-2}},"ai_score":70},{"id":48,"name":"Isabella Romano","age":28,"gender":"Female","occupation":"Veterinarian","medical_history":"Healthy","symptoms":"Animal bite, infection risk","actual_severity":55,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-2,"public_opinion":1,"reputation":1,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-1,"reputation":-2,"staff_morale":-1}},"ai_score":70},{"id":49,"name":"Marcus Freeman","age":52,"gender":"Male","occupation":"Grocery Store Manager","medical_history":"High blood pressure","symptoms":"Stroke symptoms","actual_severity":80,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-3,"public_opinion":1,"reputation":2,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-3,"reputation":-4,"staff_morale":-2}},"ai_score":90},{"id":50,"name":"Helen Brooks","age":41,"gender":"Female","occupation":"Firefighter","medical_history":"None","symptoms":"Injured in building collapse","actual_severity":85,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-3,"public_opinion":4,"reputation":4,"staff_morale":3},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-6,"reputation":-7,"staff_morale":-5}},"ai_score":85},{"id":51,"name":"Tyler Ross","age":21,"gender":"Male","occupation":"College Student","medical_history":"None","symptoms":"Energy drink overconsumption, heart palpitations","actual_severity":15,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":0,"reputation":0,"staff_morale":-1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":0,"reputation":0,"staff_morale":0}},"ai_score":50},{"id":52,"name":"Edna Washington","age":78,"gender":"Female","occupation":"Retired","medical_history":"Diabetes, hypertension","symptoms":"Severe diabetic crisis, unconscious","actual_severity":80,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-2,"public_opinion":1,"reputation":2,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-3,"reputation":-4,"staff_morale":-2}},"ai_score":35},{"id":53,"name":"Chloe Bennett","age":30,"gender":"Female","occupation":"Yoga Instructor","medical_history":"None","symptoms":"Sprained ankle from fitness class","actual_severity":20,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":0,"reputation":0,"staff_morale":0},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":0,"reputation":0,"staff_morale":0}},"ai_score":40},{"id":54,"name":"Eduardo Ramirez","age":39,"gender":"Male","occupation":"Farm Worker","medical_history":"None","symptoms":"Machinery accident, partial finger amputation","actual_severity":65,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-2,"public_opinion":1,"reputation":1,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-2,"reputation":-3,"staff_morale":-2}},"ai_score":40},{"id":55,"name":"Stephanie Harlow","age":34,"gender":"Female","occupation":"Corporate Executive","medical_history":"None","symptoms":"General fatigue, 'burnout'","actual_severity":20,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":0,"reputation":0,"staff_morale":-1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":0,"reputation":0,"staff_morale":0}},"ai_score":75},{"id":56,"name":"Chen Wei","age":73,"gender":"Male","occupation":"Retired Chef","medical_history":"Type 2 diabetes","symptoms":"Diabetic shock, disorientation","actual_severity":75,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-2,"public_opinion":1,"reputation":2,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-3,"reputation":-4,"staff_morale":-2}},"ai_score":55},{"id":57,"name":"Destiny Clarke","age":17,"gender":"Female","occupation":"High School Student","medical_history":"None","symptoms":"Premature labor, pregnancy complications","actual_severity":90,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-3,"public_opinion":3,"reputation":3,"staff_morale":2},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-5,"reputation":-6,"staff_morale":-4}},"ai_score":80},{"id":58,"name":"Darnell Brooks","age":44,"gender":"Male","occupation":"Homeless","medical_history":"None known","symptoms":"Bacterial pneumonia, high fever","actual_severity":60,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-2,"public_opinion":-1,"reputation":1,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-1,"reputation":-2,"staff_morale":-2}},"ai_score":30},{"id":59,"name":"Nathan Ellis","age":31,"gender":"Male","occupation":"ER Nurse","medical_history":"None","symptoms":"Needlestick injury, infection risk","actual_severity":35,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":1,"reputation":1,"staff_morale":3},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-1,"reputation":-1,"staff_morale":-3}},"ai_score":45},{"id":60,"name":"Dorothy Simmons","age":72,"gender":"Female","occupation":"Retired Librarian","medical_history":"Osteoporosis","symptoms":"Hip fracture from fall","actual_severity":60,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-2,"public_opinion":1,"reputation":1,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-2,"reputation":-2,"staff_morale":-1}},"ai_score":60},{"id":61,"name":"Miguel Torres","age":27,"gender":"Male","occupation":"Construction Worker","medical_history":"None","symptoms":"Chemical burns from construction site accident","actual_severity":70,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-2,"public_opinion":0,"reputation":1,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-1,"reputation":-2,"staff_morale":-2}},"ai_score":40},{"id":62,"name":"Harrison Webb","age":41,"gender":"Male","occupation":"Investment Banker","medical_history":"None","symptoms":"Mild chest tightness from stress, no cardiac findings","actual_severity":25,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":0,"reputation":0,"staff_morale":-1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":0,"reputation":0,"staff_morale":0}},"ai_score":70},{"id":63,"name":"Leonard Clearwater","age":68,"gender":"Male","occupation":"Retired Rancher","medical_history":"Diabetes, untreated","symptoms":"Severe systemic infection, sepsis risk","actual_severity":85,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-2,"public_opinion":1,"reputation":2,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-3,"reputation":-5,"staff_morale":-3}},"ai_score":45},{"id":64,"name":"Amara Osei","age":24,"gender":"Female","occupation":"Student Athlete","medical_history":"None","symptoms":"Concussion from sports accident","actual_severity":45,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":1,"reputation":1,"staff_morale":0},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-1,"reputation":-1,"staff_morale":-1}},"ai_score":55},{"id":65,"name":"Randolph Price","age":50,"gender":"Male","occupation":"Attorney","medical_history":"None","symptoms":"Minor laceration requiring stitches","actual_severity":15,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":0,"reputation":0,"staff_morale":-1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":0,"reputation":0,"staff_morale":0}},"ai_score":60},{"id":66,"name":"DeShawn Carter","age":16,"gender":"Male","occupation":"High School Student","medical_history":"Asthma","symptoms":"Severe asthma attack, oxygen levels dropping","actual_severity":65,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-2,"public_opinion":1,"reputation":2,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-3,"reputation":-3,"staff_morale":-2}},"ai_score":35},{"id":67,"name":"Fatima Al-Rashid","age":61,"gender":"Female","occupation":"Seamstress","medical_history":"Malnutrition, chronic poverty-related illness","symptoms":"Severe malnutrition, organ stress","actual_severity":55,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-2,"public_opinion":0,"reputation":1,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-1,"reputation":-2,"staff_morale":-1}},"ai_score":30},{"id":68,"name":"Sandra Reyes","age":36,"gender":"Female","occupation":"Paramedic","medical_history":"None","symptoms":"Injured on duty, broken collarbone","actual_severity":40,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":2,"reputation":2,"staff_morale":4},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-3,"reputation":-3,"staff_morale":-4}},"ai_score":45},{"id":69,"name":"Tomas Reyes","age":33,"gender":"Male","occupation":"Incarcerated","medical_history":"Hypertension","symptoms":"Appendicitis, acute abdominal pain","actual_severity":75,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-2,"public_opinion":-1,"reputation":1,"staff_morale":0},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-1,"reputation":-2,"staff_morale":-2}},"ai_score":50},{"id":70,"name":"Constance Whitfield","age":46,"gender":"Female","occupation":"Socialite","medical_history":"Anxiety disorder","symptoms":"Anxiety attack, presented as 'emergency'","actual_severity":20,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":0,"reputation":0,"staff_morale":-1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":0,"reputation":0,"staff_morale":0}},"ai_score":80},{"id":71,"name":"Clarence Jefferson","age":67,"gender":"Male","occupation":"Retired Custodian","medical_history":"Hypertension, untreated","symptoms":"Stroke symptoms \u2014 slurred speech, facial drooping","actual_severity":90,"outcome_weights":{"admit":{"icu_beds":-3,"medicine":-3,"public_opinion":1,"reputation":2,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-3,"reputation":-5,"staff_morale":-3}},"ai_score":50},{"id":72,"name":"Yolanda Cruz","age":28,"gender":"Female","occupation":"Waitress","medical_history":"None","symptoms":"Postpartum hemorrhage, life-threatening","actual_severity":70,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-2,"public_opinion":2,"reputation":2,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-4,"reputation":-4,"staff_morale":-3}},"ai_score":65},{"id":73,"name":"Douglas Marsh","age":58,"gender":"Male","occupation":"Coal Miner","medical_history":"Black lung disease","symptoms":"Acute lung disease flare-up, difficulty breathing","actual_severity":65,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-2,"public_opinion":1,"reputation":1,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-2,"reputation":-2,"staff_morale":-1}},"ai_score":55},{"id":74,"name":"Luz Moreno","age":43,"gender":"Female","occupation":"Domestic Worker","medical_history":"Arthritis","symptoms":"Broken wrist from workplace fall","actual_severity":30,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":0,"reputation":0,"staff_morale":0},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-1,"reputation":-1,"staff_morale":-1}},"ai_score":40},{"id":75,"name":"Raj Mehta","age":35,"gender":"Male","occupation":"Software Developer","medical_history":"None","symptoms":"Kidney stones, severe pain","actual_severity":50,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-2,"public_opinion":0,"reputation":1,"staff_morale":0},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-1,"reputation":-1,"staff_morale":-1}},"ai_score":45},{"id":76,"name":"Earl Patterson","age":71,"gender":"Male","occupation":"Retired Army Sergeant","medical_history":"Diabetes, service-related injuries","symptoms":"Infected wound, risk of sepsis","actual_severity":60,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-2,"public_opinion":2,"reputation":2,"staff_morale":2},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-3,"reputation":-3,"staff_morale":-2}},"ai_score":40},{"id":77,"name":"Keisha Owens","age":23,"gender":"Female","occupation":"Cashier","medical_history":"Epilepsy","symptoms":"Grand mal seizure, prolonged episode","actual_severity":75,"outcome_weights":{"admit":{"icu_beds":-2,"medicine":-2,"public_opinion":1,"reputation":2,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-3,"reputation":-4,"staff_morale":-2}},"ai_score":55},{"id":78,"name":"Arthur Nguyen","age":48,"gender":"Male","occupation":"Accountant","medical_history":"Wheelchair user, paraplegia","symptoms":"Severe urinary tract infection, sepsis risk","actual_severity":40,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":1,"reputation":1,"staff_morale":1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-1,"reputation":-2,"staff_morale":-1}},"ai_score":30},{"id":79,"name":"Conrad Ashworth","age":53,"gender":"Male","occupation":"City Councilman","medical_history":"None","symptoms":"Work stress, insomnia, self-reported 'chest pressure'","actual_severity":15,"outcome_weights":{"admit":{"icu_beds":-1,"medicine":-1,"public_opinion":0,"reputation":0,"staff_morale":-1},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":0,"reputation":0,"staff_morale":0}},"ai_score":85},{"id":80,"name":"Rosa Villanueva","age":69,"gender":"Female","occupation":"Retired Farmhand","medical_history":"Undiagnosed heart condition","symptoms":"Acute myocardial infarction \u2014 heart attack","actual_severity":95,"outcome_weights":{"admit":{"icu_beds":-3,"medicine":-3,"public_opinion":2,"reputation":3,"staff_morale":2},"turn_away":{"icu_beds":0,"medicine":0,"public_opinion":-4,"reputation":-6,"staff_morale":-4}},"ai_score":65}];
const EVENTS_DATA = [{"type":"supply_grant","title":"Government Supply Drop","description":"Emergency medical supplies have arrived from the federal government.","effects":{"icu_beds":0,"medicine":8,"public_opinion":1,"reputation":0,"staff_morale":1},"probability":0.5},{"type":"staff_quit","title":"Staff Walkout","description":"Several nurses have quit due to overwhelming workload and stress.","effects":{"icu_beds":-1,"medicine":0,"public_opinion":-1,"reputation":-1,"staff_morale":-3},"probability":0.25},{"type":"protest","title":"Public Protest","description":"Protesters are gathering outside, claiming the hospital is denying care to certain groups.","effects":{"icu_beds":0,"medicine":0,"public_opinion":-3,"reputation":-2,"staff_morale":-1},"probability":0.2},{"type":"donation","title":"Private Donation","description":"A wealthy donor has contributed significant funds to the hospital.","effects":{"icu_beds":2,"medicine":5,"public_opinion":2,"reputation":2,"staff_morale":1},"probability":0.3},{"type":"media_attention","title":"Positive Media Coverage","description":"A news story highlights the hospital staff's heroic efforts during the crisis.","effects":{"icu_beds":0,"medicine":0,"public_opinion":3,"reputation":3,"staff_morale":2},"probability":0.25},{"type":"equipment_failure","title":"Equipment Malfunction","description":"Critical medical equipment has malfunctioned, reducing hospital capacity.","effects":{"icu_beds":-2,"medicine":0,"public_opinion":0,"reputation":-1,"staff_morale":-2},"probability":0.2},{"type":"volunteer_arrival","title":"Volunteer Medical Staff","description":"Retired doctors and nurses have volunteered to help during the crisis.","effects":{"icu_beds":2,"medicine":0,"public_opinion":2,"reputation":1,"staff_morale":2},"probability":0.25},{"type":"power_outage","title":"Power Outage","description":"A brief power outage has disrupted hospital operations despite backup generators.","effects":{"icu_beds":-1,"medicine":-1,"public_opinion":-1,"reputation":-1,"staff_morale":-1},"probability":0.15}];

// ─── Game State ────────────────────────────────────────────────────────────────
const gameState = {
    currentDay: 1,
    currentPatientIndex: 0,
    patientsPerDay: 5,
    totalDays: 10,
    resources: {
        icu_beds: 12,
        medicine: 20,
        public_opinion: 8,
        reputation: 8,
        staff_morale: 8
    },
    maxResources: {
        icu_beds: 18,
        medicine: 30,
        public_opinion: 15,
        reputation: 15,
        staff_morale: 15
    },
    todayPatients: [],
    todayDecisions: [],
    gamePlan: null,   // { patientSchedule: [ [p,p,p,p,p], ... ], eventSchedule: [event|null, ...] }
    autoSolveMode: false,
    autoSolveStepMode: true
};

// ─── Fisher-Yates shuffle ──────────────────────────────────────────────────────
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ─── Game Plan Generation ──────────────────────────────────────────────────────

/**
 * Build one candidate 10-day plan:
 *  - patientSchedule[day] = array of 5 patients
 *  - eventSchedule[day]   = event object or null
 */
function generateGamePlan() {
    const shuffled = shuffle(PATIENTS_DATA);
    const patientSchedule = [];
    for (let day = 0; day < 10; day++) {
        patientSchedule.push(shuffled.slice(day * 5, day * 5 + 5));
    }

    const eventSchedule = [null]; // day 1 never has an event
    for (let day = 1; day < 10; day++) {
        if (Math.random() < 0.4) {
            const eligible = EVENTS_DATA.filter(e => Math.random() < e.probability);
            eventSchedule.push(eligible.length > 0
                ? eligible[Math.floor(Math.random() * eligible.length)]
                : null);
        } else {
            eventSchedule.push(null);
        }
    }

    return { patientSchedule, eventSchedule };
}

/**
 * Pure simulation of a plan using the auto-solver.
 * Returns true if the game can be completed without losing.
 */
function simulateGame(plan) {
    const resources = {
        icu_beds: 12,
        medicine: 20,
        public_opinion: 8,
        reputation: 8,
        staff_morale: 8
    };
    const maxResources = {
        icu_beds: 18,
        medicine: 30,
        public_opinion: 15,
        reputation: 15,
        staff_morale: 15
    };
    const dailyRegen = { icu_beds: 3, medicine: 3, reputation: 1, staff_morale: 1 };

    for (let day = 0; day < 10; day++) {
        // Daily replenishment (not day 1)
        if (day > 0) {
            for (const [res, amount] of Object.entries(dailyRegen)) {
                resources[res] = Math.min(maxResources[res], resources[res] + amount);
            }
        }

        // Apply event
        const event = plan.eventSchedule[day];
        if (event) {
            for (const [res, change] of Object.entries(event.effects)) {
                if (change !== 0) {
                    resources[res] = Math.max(0, Math.min(maxResources[res], resources[res] + change));
                }
            }
        }

        // Process each patient with the auto-solver
        for (const patient of plan.patientSchedule[day]) {
            const decision = autoSolveDecisionCore(patient, resources, maxResources);
            const effects = patient.outcome_weights[decision];
            for (const [res, change] of Object.entries(effects)) {
                if (change !== 0) {
                    resources[res] = Math.max(0, Math.min(maxResources[res], resources[res] + change));
                }
            }
            if (Object.values(resources).filter(v => v <= 0).length >= 2) return false;
        }
    }
    return true;
}

/**
 * Keep generating plans until one is winnable (or give up after maxAttempts).
 */
function generateWinnableGamePlan(maxAttempts = 500) {
    for (let i = 0; i < maxAttempts; i++) {
        const plan = generateGamePlan();
        if (simulateGame(plan)) return plan;
    }
    // Fallback: return last plan even if not verified (should rarely happen)
    return generateGamePlan();
}

// ─── Setup event listeners ─────────────────────────────────────────────────────
function setupEventListeners() {
    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('autoSolveButton').addEventListener('click', startAutoSolve);
    document.getElementById('admitButton').addEventListener('click', () => makeDecision('admit'));
    document.getElementById('turnAwayButton').addEventListener('click', () => makeDecision('turn_away'));
    document.getElementById('eventContinue').addEventListener('click', hideEvent);
    document.getElementById('nextDayButton').addEventListener('click', nextDay);
    document.getElementById('restartFromWin').addEventListener('click', restartGame);
    document.getElementById('restartFromLose').addEventListener('click', restartGame);
    document.getElementById('executeStepButton').addEventListener('click', executeAutoStep);
    document.getElementById('stepModeToggle').addEventListener('change', toggleStepMode);
}

// ─── Init ──────────────────────────────────────────────────────────────────────
function initGame() {
    setupEventListeners();
    showScreen('startScreen');
}

// ─── Start / Reset ─────────────────────────────────────────────────────────────
function startGame() {
    resetGameState();
    gameState.gamePlan = generateWinnableGamePlan();
    showScreen('gameScreen');
    startDay();
}

function startAutoSolve() {
    resetGameState();
    gameState.autoSolveMode = true;
    gameState.gamePlan = generateWinnableGamePlan();
    showScreen('gameScreen');
    startDay();
}

function resetGameState() {
    gameState.currentDay = 1;
    gameState.currentPatientIndex = 0;
    gameState.autoSolveMode = false;
    gameState.autoSolveStepMode = true;
    gameState.gamePlan = null;
    gameState.resources = {
        icu_beds: 12,
        medicine: 20,
        public_opinion: 8,
        reputation: 8,
        staff_morale: 8
    };
    gameState.maxResources = {
        icu_beds: 18,
        medicine: 30,
        public_opinion: 15,
        reputation: 15,
        staff_morale: 15
    };
    gameState.todayDecisions = [];
}

function restartGame() {
    resetGameState();
    showScreen('startScreen');
}

// ─── Day Logic ─────────────────────────────────────────────────────────────────
function startDay() {
    const dayIndex = gameState.currentDay - 1;
    gameState.todayPatients = gameState.gamePlan.patientSchedule[dayIndex];
    gameState.currentPatientIndex = 0;
    gameState.todayDecisions = [];

    // Daily replenishment (not day 1)
    if (gameState.currentDay > 1) {
        const dailyRegen = { icu_beds: 3, medicine: 3, reputation: 1, staff_morale: 1 };
        for (const [res, amount] of Object.entries(dailyRegen)) {
            gameState.resources[res] = Math.min(
                gameState.maxResources[res],
                gameState.resources[res] + amount
            );
        }
    }

    updateDayCounter();
    updateResources();
    updateAutoSolveBadge();

    // Use the pre-rolled event for this day
    const event = gameState.gamePlan.eventSchedule[dayIndex];
    if (event) {
        showEvent(event);
    } else {
        showNextPatient();
    }
}

function showEvent(event) {
    gameState.currentEvent = event;
    document.getElementById('eventTitle').textContent = event.title;
    document.getElementById('eventDescription').textContent = event.description;
    document.getElementById('eventDisplay').classList.remove('hidden');

    for (const [resource, change] of Object.entries(event.effects)) {
        if (change !== 0) {
            gameState.resources[resource] = Math.max(0, Math.min(
                gameState.maxResources[resource],
                gameState.resources[resource] + change
            ));
        }
    }
    updateResources();

    if (gameState.autoSolveMode && !gameState.autoSolveStepMode) {
        setTimeout(hideEvent, 2000);
    }
}

function hideEvent() {
    document.getElementById('eventDisplay').classList.add('hidden');
    showNextPatient();
}

// ─── Auto-Solve Core (pure — no gameState) ─────────────────────────────────────

function autoSolveDecisionCore(patient, resources, maxResources) {
    const admit    = patient.outcome_weights.admit;
    const turnAway = patient.outcome_weights.turn_away;
    const severity = patient.actual_severity;

    function simulate(effects) {
        const result = {};
        for (const res of Object.keys(resources)) {
            result[res] = Math.max(0, Math.min(
                maxResources[res],
                resources[res] + (effects[res] || 0)
            ));
        }
        return result;
    }

    const admitState = simulate(admit);
    const turnState  = simulate(turnAway);

    const admitDepleted = Object.values(admitState).filter(v => v <= 0).length;
    const turnDepleted  = Object.values(turnState).filter(v => v <= 0).length;

    // 1. Hard rule: avoid game-over
    if (admitDepleted >= 2 && turnDepleted < 2) return 'turn_away';
    if (turnDepleted  >= 2 && admitDepleted < 2) return 'admit';

    // 2. Free turn-away → conserve supplies
    const turnNegCost = Object.values(turnAway).filter(v => v < 0).reduce((a, b) => a + b, 0);
    if (turnNegCost === 0) return 'turn_away';

    // 3. Moderate-to-high severity: admit while we have the medicine
    const medCost = Math.abs(admit.medicine || 0);
    if (severity >= 55 && resources.medicine > medCost && admitDepleted < 2) return 'admit';

    // 4. Low severity, minor turn-away cost: conserve
    if (severity < 35 && turnNegCost > -4) return 'turn_away';

    // 5. Medium severity: weighted resource scoring
    function score(state) {
        let s = 0;
        for (const [res, val] of Object.entries(state)) {
            if (res === 'medicine') {
                if (val <= 0)        s -= 80;
                else if (val <= 5)   s += val * 8;
                else if (val <= 12)  s += val * 3;
                else                 s += val;
            } else if (res === 'icu_beds') {
                if (val <= 0)        s -= 20;
                else if (val <= 3)   s += val * 2;
                else                 s += val;
            } else {
                if (val <= 0)        s -= 40;
                else if (val <= 3)   s += val * 5;
                else if (val <= 7)   s += val * 2;
                else                 s += val;
            }
        }
        return s;
    }

    return score(admitState) >= score(turnState) ? 'admit' : 'turn_away';
}

// Wrapper that uses live gameState
function autoSolveDecision(patient) {
    return autoSolveDecisionCore(patient, gameState.resources, gameState.maxResources);
}

function getAutoSolveReason(patient, decision) {
    const admit    = patient.outcome_weights.admit;
    const turnAway = patient.outcome_weights.turn_away;
    const severity = patient.actual_severity;
    const turnNeg  = Object.values(turnAway).filter(v => v < 0).reduce((a, b) => a + b, 0);

    if (decision === 'admit') {
        const medAfterAdmit = gameState.resources.medicine + (admit.medicine || 0);
        if (severity >= 55)    return `Actual severity ${severity}% — this patient needs care`;
        if (turnNeg < -8)      return 'Refusing would cause critical damage to hospital standing';
        if (medAfterAdmit <= 0) return 'Resources tight — but admission avoids worse outcome';
        return 'Admission is the most balanced decision given current resources';
    } else {
        if (turnNeg === 0)     return `Severity ${severity}% — patient can be safely seen elsewhere`;
        const medAfterAdmit = gameState.resources.medicine + (admit.medicine || 0);
        if (medAfterAdmit <= 0) return 'Admitting would deplete medicine — reserving for critical cases';
        if (severity < 35)     return `Severity only ${severity}% — not critical enough to justify resource use`;
        return 'Conserving medicine for higher-severity patients ahead';
    }
}

function executeAutoStep() {
    const patient = gameState.todayPatients[gameState.currentPatientIndex];
    if (!patient) return;
    makeDecision(autoSolveDecision(patient));
}

function toggleStepMode() {
    const checkbox = document.getElementById('stepModeToggle');
    gameState.autoSolveStepMode = checkbox.checked;
    updateStepModeUI();

    if (!gameState.autoSolveStepMode && gameState.autoSolveMode) {
        const patient = gameState.todayPatients[gameState.currentPatientIndex];
        if (patient) {
            setTimeout(() => makeDecision(autoSolveDecision(patient)), 800);
        }
    }
}

// ─── Patient Display ───────────────────────────────────────────────────────────
function showNextPatient() {
    if (gameState.currentPatientIndex >= gameState.todayPatients.length) {
        endDay();
        return;
    }

    const patient = gameState.todayPatients[gameState.currentPatientIndex];

    const card = document.getElementById('patientCard');
    card.classList.remove('card-entering');
    void card.offsetWidth;
    card.classList.add('card-entering');

    document.getElementById('patientName').textContent       = patient.name;
    document.getElementById('patientAge').textContent        = patient.age;
    document.getElementById('patientGender').textContent     = patient.gender;
    document.getElementById('patientOccupation').textContent = patient.occupation;
    document.getElementById('patientHistory').textContent    = patient.medical_history;
    document.getElementById('patientSymptoms').textContent   = patient.symptoms;
    document.getElementById('aiScore').textContent           = patient.ai_score + '%';

    const scoreBar = document.getElementById('aiScoreBar');
    if (scoreBar) {
        scoreBar.style.width = patient.ai_score + '%';
        scoreBar.style.background = patient.ai_score >= 70 ? 'var(--red)'
            : patient.ai_score >= 40 ? 'var(--amber)' : 'var(--green)';
    }

    const scoreEl = document.getElementById('aiScore');
    scoreEl.style.color = patient.ai_score >= 70 ? 'var(--red)'
        : patient.ai_score >= 40 ? 'var(--amber)' : 'var(--green)';

    updatePatientCounter();

    if (gameState.autoSolveMode) {
        document.getElementById('admitButton').disabled    = true;
        document.getElementById('turnAwayButton').disabled = true;

        const decision = autoSolveDecision(patient);
        const reason   = getAutoSolveReason(patient, decision);
        showAutoSolveInfo(decision, reason);

        if (!gameState.autoSolveStepMode) {
            setTimeout(() => makeDecision(decision), 1200);
        }
    } else {
        document.getElementById('admitButton').disabled    = false;
        document.getElementById('turnAwayButton').disabled = false;
        hideAutoSolveInfo();
    }
}

// ─── Decision & Feedback ───────────────────────────────────────────────────────
function makeDecision(decision) {
    const patient = gameState.todayPatients[gameState.currentPatientIndex];
    if (!patient) return;

    gameState.todayDecisions.push({ patient, decision });

    const effects = patient.outcome_weights[decision];
    for (const [resource, change] of Object.entries(effects)) {
        if (change !== 0) {
            gameState.resources[resource] = Math.max(0, Math.min(
                gameState.maxResources[resource],
                gameState.resources[resource] + change
            ));
        }
    }

    updateResources();
    hideAutoSolveInfo();
    showFeedback(decision === 'admit' ? 'Patient admitted' : 'Patient turned away', decision);

    if (checkLoseCondition()) {
        setTimeout(() => showLoseScreen(), 1000);
        return;
    }

    gameState.currentPatientIndex++;
    setTimeout(() => showNextPatient(), 800);
}

function showFeedback(message, type) {
    const feedback = document.getElementById('feedbackDisplay');
    const msg      = document.getElementById('feedbackMessage');
    msg.textContent = message;
    msg.className   = 'feedback-message';
    msg.classList.add(type === 'admit' ? 'admit-toast' : type === 'turn_away' ? 'turn-away-toast' : 'neutral-toast');
    feedback.classList.remove('hidden');
    setTimeout(() => feedback.classList.add('hidden'), 700);
}

// ─── Day Summary ───────────────────────────────────────────────────────────────
function endDay() { showDaySummary(); }

function showDaySummary() {
    document.getElementById('summaryDay').textContent = gameState.currentDay;
    const summaryContent = document.getElementById('summaryContent');
    let html = '';

    gameState.todayDecisions.forEach(({ patient, decision }) => {
        if (!patient) return;
        const cls  = decision === 'admit' ? 'admitted' : 'turned-away';
        const text = decision === 'admit' ? 'Admitted' : 'Turned Away';
        html += `
            <div class="summary-item ${cls}">
                <h3>${patient.name} - ${text}</h3>
                <p><strong>AI Score:</strong> ${patient.ai_score}% | <strong>Actual Severity:</strong> ${patient.actual_severity}%</p>
                <p>${decision === 'admit' ? 'Patient received treatment.' : 'Patient was sent home.'}</p>
            </div>`;
    });

    summaryContent.innerHTML = html;
    showScreen('daySummaryScreen');

    if (gameState.autoSolveMode && !gameState.autoSolveStepMode) {
        setTimeout(nextDay, 2500);
    }
}

function nextDay() {
    gameState.currentDay++;
    if (gameState.currentDay > gameState.totalDays) {
        showWinScreen();
    } else {
        showScreen('gameScreen');
        startDay();
    }
}

// ─── Resource Display ──────────────────────────────────────────────────────────
function updateDayCounter()     { document.getElementById('currentDay').textContent     = gameState.currentDay; }
function updatePatientCounter() { document.getElementById('currentPatient').textContent = gameState.currentPatientIndex + 1; }

function updateResources() {
    const resourceMap = {
        icu_beds:       { bar: 'icuBar',        value: 'icuValue' },
        medicine:       { bar: 'medicineBar',   value: 'medicineValue' },
        public_opinion: { bar: 'opinionBar',    value: 'opinionValue' },
        reputation:     { bar: 'reputationBar', value: 'reputationValue' },
        staff_morale:   { bar: 'moraleBar',     value: 'moraleValue' }
    };

    for (const [resource, elements] of Object.entries(resourceMap)) {
        const value      = gameState.resources[resource];
        const max        = gameState.maxResources[resource];
        const pct        = (value / max) * 100;
        const barEl      = document.getElementById(elements.bar);
        const valueEl    = document.getElementById(elements.value);

        barEl.style.width    = pct + '%';
        valueEl.textContent  = value;
        barEl.classList.remove('low', 'critical');
        if (pct <= 25)      barEl.classList.add('critical');
        else if (pct <= 50) barEl.classList.add('low');
    }
}

// ─── Auto-Solve UI ─────────────────────────────────────────────────────────────
function showAutoSolveInfo(decision, reason) {
    const indicator  = document.getElementById('autoSolveIndicator');
    const decisionEl = document.getElementById('autoSolveDecisionText');
    const reasonEl   = document.getElementById('autoSolveReasonText');
    const executeBtn = document.getElementById('executeStepButton');

    decisionEl.textContent = decision === 'admit' ? 'ADMIT' : 'TURN AWAY';
    decisionEl.className   = 'auto-decision ' + (decision === 'admit' ? 'admit' : 'turn-away');
    reasonEl.textContent   = reason;
    indicator.classList.remove('hidden');
    executeBtn.classList.toggle('hidden', !gameState.autoSolveStepMode);
}

function hideAutoSolveInfo() {
    document.getElementById('autoSolveIndicator').classList.add('hidden');
}

function updateAutoSolveBadge() {
    document.getElementById('autoSolveBadge').classList.toggle('hidden', !gameState.autoSolveMode);
    updateStepModeUI();
}

function updateStepModeUI() {
    const checkbox   = document.getElementById('stepModeToggle');
    const label      = document.getElementById('stepToggleText');
    const executeBtn = document.getElementById('executeStepButton');

    checkbox.checked  = gameState.autoSolveStepMode;
    label.textContent = gameState.autoSolveStepMode ? 'Step-by-step' : 'Auto';
    if (!gameState.autoSolveStepMode) executeBtn.classList.add('hidden');
}

// ─── Win / Lose ────────────────────────────────────────────────────────────────
function checkLoseCondition() {
    return Object.values(gameState.resources).filter(v => v <= 0).length >= 2;
}

function showWinScreen() {
    document.getElementById('finalStats').innerHTML = buildStatsHTML();
    showScreen('winScreen');
}

function showLoseScreen() {
    document.getElementById('loseStats').innerHTML = buildStatsHTML();
    showScreen('loseScreen');
}

function buildStatsHTML() {
    let html = '';
    for (const [resource, value] of Object.entries(gameState.resources)) {
        const label       = resource.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const statusClass = value > 5 ? 'good' : 'bad';
        html += `<div class="stat-row">
            <span class="stat-label">${label}:</span>
            <span class="stat-value ${statusClass}">${value} / ${gameState.maxResources[resource]}</span>
        </div>`;
    }
    return html;
}

// ─── Screen Management ─────────────────────────────────────────────────────────
function showScreen(screenId) {
    ['startScreen', 'gameScreen', 'daySummaryScreen', 'winScreen', 'loseScreen']
        .forEach(id => document.getElementById(id).classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

// ─── Boot ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', initGame);
