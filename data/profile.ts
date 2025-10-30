export type Experience = {
  role: string;
  company: string;
  url?: string;
  location: string;
  timeframe: string;
  summary: string;
  achievements: string[];
};

export type Talk = {
  title: string;
  event: string;
  year: string;
  url?: string;
};

export const profile = {
  name: "Alvaro Llamojha",
  title: "DevOps & Observability Engineer",
  location: "London, United Kingdom",
  summary:
    "DevOps and observability engineer with extensive experience designing cloud-native platforms for large-scale commerce organisations. Skilled across AWS, serverless architectures, infrastructure as code, and end-to-end monitoring. Recent work partners with start-ups and boutique consultancies to introduce AI-assisted workflows and responsible adoption patterns for generative AI services, including AWS Bedrock model orchestration.",
  highlights: [
    "Delivered a New Relic observability rollout for JD Sports peak trading, complete with a Black Friday 2022 command-centre dashboard for support teams.",
    "Designed LEGO.com's first serverless microservices iteration with Node.js/TypeScript and GitHub Actions, then guided the move to AWS ECS Fargate with Terraform-based IaC.",
    "Supports generative AI start-ups with AWS serverless data pipelines, including Musicfy where product analytics and observability were instrumented with PostHog."
  ],
  impact: [
    {
      value: "JD Sports",
      label: "Command-centre telemetry prepared for Black Friday 2022"
    },
    {
      value: "LEGO.com",
      label: "Serverless microservices and Terraform IaC foundations"
    },
    {
      value: "Musicfy",
      label: "AI observability and analytics instrumentation via PostHog"
    }
  ],
  trustedBy: ["JD Sports", "LEGO.com", "Musicfy"],
  callToAction: {
    label: "Book observability & platform consulting",
    href: "mailto:hello@amllamojha.com"
  }
};

export const expertise = [
  "AWS & Serverless Architecture",
  "Terraform & Infrastructure as Code",
  "CI/CD Automation (GitHub Actions, CircleCI, Jenkins)",
  "Observability (New Relic, Elasticsearch/Kibana, PagerDuty)",
  "JavaScript/TypeScript & Node.js",
  "Generative AI Enablement"
];

export const experience: Experience[] = [
  {
    role: "Director & Principal Consultant",
    company: "No Limits Solutions",
    location: "London",
    timeframe: "May 2022 – Present",
    summary:
      "Provide observability, platform, and DevOps consulting to retail and data-driven organisations as a solo practitioner.",
    achievements: [
      "Delivered a New Relic observability rollout for JD Sports peak trading, including a Black Friday 2022 \"command centre\" dashboard for support teams.",
      "Established monitoring and alerting across frontend, backend, and third-party services to strengthen incident response for contract clients.",
      "Supported generative AI start-ups with AWS, serverless, and data pipelines, including Musicfy where observability and product analytics were instrumented with PostHog."
    ]
  },
  {
    role: "Senior AWS DevOps & Serverless Engineer",
    company: "LEGO.com",
    url: "https://www.lego.com",
    location: "London",
    timeframe: "May 2018 – May 2022",
    summary:
      "Designed and scaled LEGO.com's cloud-native platforms while safeguarding peak-season reliability.",
    achievements: [
      "Designed and rolled out the first serverless microservices iteration with Node.js and TypeScript, plus CI/CD for a monorepo using GitHub Actions.",
      "Transitioned LEGO.com infrastructure to AWS ECS Fargate with Terraform-based IaC, improving deployment consistency.",
      "Eliminated high-severity incidents during peak seasons through refined monitoring with New Relic, Elasticsearch/Kibana, PagerDuty, and an AWS Infrastructure Event Manager framework.",
      "Optimised developer experience by modernising CI/CD tooling (Jenkins, CircleCI, GitHub Actions) and enabling git-tag-based deployments for frontend apps."
    ]
  },
  {
    role: "DevOps Engineer",
    company: "SecretSales",
    url: "https://www.secretsales.com",
    location: "London",
    timeframe: "Aug 2017 – May 2018",
    summary:
      "Introduced containerisation and actionable observability to an e-commerce flash sale platform.",
    achievements: [
      "Introduced Docker-based containerisation for local and AWS ECS environments using AWS CloudFormation.",
      "Strengthened production observability with New Relic, AWS CloudWatch, and PagerDuty while supporting on-call rotations."
    ]
  },
  {
    role: "DevOps Engineer",
    company: "Shopological",
    url: "https://www.shopological.com",
    location: "London",
    timeframe: "Aug 2016 – Aug 2017",
    summary:
      "Supported a fashion discovery platform across multi-cloud infrastructure, monitoring, and deployment pipelines.",
    achievements: [
      "Maintained AWS, Terraform, Ansible, Sensu, and GOCD pipelines for PHP and Java services.",
      "Improved platform reliability through infrastructure automation and observability enhancements."
    ]
  },
  {
    role: "Systems Engineer",
    company: "MetaBroadcast",
    url: "https://www.metabroadcast.com",
    location: "London",
    timeframe: "Aug 2015 – Aug 2016",
    summary:
      "Operated metadata platforms for UK broadcasters with a focus on reliability engineering and automation.",
    achievements: [
      "Leveraged AWS, Puppet, Sensu, Logstash, Kafka, Cassandra, and Jenkins to support media data services.",
      "Focused on incident response and automation to keep broadcaster workloads reliable."
    ]
  },
  {
    role: "Linux Systems Administrator",
    company: "Indra UK",
    url: "https://www.indracompany.com",
    location: "Whiteley, Hampshire",
    timeframe: "Apr 2012 – Aug 2015",
    summary:
      "Supported air traffic management solutions for NATS by managing mission-critical Linux systems.",
    achievements: [
      "Applied configuration management, monitoring, and scripting to maintain high-availability environments.",
      "Partnered with engineering teams to support reliable delivery of air traffic systems."
    ]
  }
];

export const education = [
  {
    name: "AWS Solutions Architect Associate",
    institution: "Amazon Web Services",
    year: "2020"
  },
  {
    name: "Advanced C++ Development",
    institution: "QA Training, London",
    year: "2014"
  }
];

export const talks: Talk[] = [
  {
    title: "CI/CD & Monorepos: Our Approach for LEGO.com",
    event: "The National DevOps Conference / Geekle DevOpsStarts",
    year: "2021 – 2022"
  },
  {
    title: "Tag-Based Deployment for a Serverless Mono-repo",
    event: "GCS Connect",
    year: "2020",
    url: "https://www.youtube.com/watch?v=Dg2WcgMZ62Y"
  },
  {
    title: "Fargate Journey of LEGO.com",
    event: "LEGO.com Software Engineer Meetup",
    year: "2019"
  }
];

export const volunteering = [
  {
    name: "CodeYourFuture Volunteer Mentor",
    summary:
      "Support aspiring technologists through project guidance, pair-programming sessions, and career coaching to build confidence and employability."
  }
];

export const interests = [
  "Developer enablement",
  "Observability strategy",
  "Platform reliability",
  "Generative AI experiments"
];
