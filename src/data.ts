export const portfolioData = {
  name: "Nuwan Dewasurendra",
  title: "Aspiring Engineer · Community Leader · Scout",
  about: "I am an aspiring Engineer with a passion for building. Along my journey, I have developed custom AI agents, engaging games, built custom LEGO creations, taught computer lessons, and led my peers as a scout leader.",
  skills: [
    { name: "Python", level: 95 },
    { name: "Algorithms & Data Structures", level: 88 },
    { name: "Competitive Programming (USACO Silver)", level: 85 },
    { name: "Game Development", level: 85 },
    { name: "Leadership & Mentoring", level: 98 },
  ],
  projects: [
    {
      id: "homebot",
      title: "HomeBot AI",
      description: "An intelligent home assistant agent built with Python and LLMs to automate daily tasks and provide natural language interaction.",
      longDescription: "HomeBot was my first deep dive into the world of Large Language Models and autonomous agents. I built a system that could understand complex natural language commands to control smart home devices, manage schedules, and even provide personalized recommendations. The project involved complex prompt engineering, state management, and integration with various APIs. It taught me the importance of user-centric design in AI systems.",
      tags: ["AI", "Python", "LLM"],
      icon: "Bot",
      features: [
        "Powered by Gemini API for natural language task management",
        "Browser automation via browser-use and Playwright",
        "Monitors weather, checks grades, and automates schedules",
        "Smart home device automation based on weather and time of day",
        "Second agent in development: builds tools & self-debugs with local LLMs",
      ],
      documentUrl: "/homebot-doc.pdf",
    },
    {
      id: "head-soccer",
      title: "Head Soccer Game",
      description: "Interactive 2D soccer game with physics modeled using PyGame & PyMunk. Features unique character abilities and smooth physics interactions.",
      longDescription: "This project was an exploration into game physics and interactive entertainment. By using PyMunk for rigid body dynamics, I created a soccer game that feels responsive and predictable yet allows for emergent gameplay. Each character has unique physics-based abilities, requiring careful balancing of mass, friction, and impulse forces. It was a great lesson in the 'game loop' architecture and real-time state management.",
      tags: ["Game Dev", "Physics", "Python"],
      icon: "Trophy",
      features: [
        "Real physics engine via PyMunk - ball momentum, gravity, and bounce",
        "PyGame sprite animation and smooth game loop",
        "Collision detection between players, ball, and all boundaries",
        "Scoring system with win/lose/reset state management",
        "Responsive keyboard controls with responsive input handling",
        "Active project maintained and expanded since 2021",
      ],
      githubUrl: "https://github.com/CampfireCoding/Head-Soccer",
      image: "/HeadSocerMain.png",
      gallery: [
        "/HeadSocer1.png",
        "/HeadSocer2.png",
        "/HeadSocer3.png",
      ],
    },
    {
      id: "snake-game",
      title: "Snake Game",
      description: "A modern recreation of the classic snake game, focusing on clean code and efficient game loop logic.",
      longDescription: "While seemingly simple, recreating the classic Snake game allowed me to focus on perfect execution of fundamental game design patterns. I implemented a modular grid system and an event-driven input handler. This project served as a benchmark for testing different AI pathfinding algorithms (like A*) to see how efficiently an agent could play the game compared to a human.",
      tags: ["Python", "Game Dev"],
      icon: "Gamepad2",
      features: [
        "Classic Snake gameplay faithfully recreated from scratch",
        "Smooth game loop with frame-rate control via PyGame",
        "Randomized food spawning with collision detection",
        "Score tracking and game-over state management",
        "Clean, readable Python code - a great learning project"
      ],
      githubUrl: "https://github.com/CampfireCoding/Google-Snake-Game",
    },
    {
      id: "lego-mechanics",
      title: "Custom Lego builds",
      description: "Custom mechanical systems exploring engineering principles through LEGO Technic. Includes complex gearboxes, autonomous robotic arms, and pneumatic systems.",
      longDescription: "My journey with LEGO Technic started as a hobby and evolved into a deep exploration of mechanical engineering. I build custom models that focus on functionality and realism. From 4-speed sequential gearboxes to remote-controlled pneumatic excavators, each project is a lesson in torque, friction, and structural integrity. I often use LEGO to prototype ideas for larger robotics projects, as it allows for rapid iteration and testing of complex mechanisms.",
      tags: ["Engineering", "LEGO", "Mechanics"],
      icon: "Settings",
      image: "/legoMain.JPG",
      features: [
        "Gear ratio experiments exploring compound mechanical advantage",
        "Structural designs load-tested for strength and stability",
        "Kinematic linkages converting rotary to linear motion",
        "Modular builds that demonstrate engineering principles"
      ],
      gallery: [
        "/lego1.jpg",
        "/lego2.png",
        "/lego3.JPG",
        "/lego4.jpg",
        "/lego5.png",
        "/lego6.jpg",
        "/lego7.jpg",
        "/lego8.jpg",
        "/lego9.png"
      ]
    },
  ],
  experience: [
    {
      role: "Staff Member",
      organization: "National Youth Leadership Training (NYLT)",
      period: "Dec 2025 - May 2026",
      description: "Coordinating program logistics for residential scout leadership training. Learning to plan logistics as a team and make sure every aspect of the program runs smoothely.",
    },
    {
      role: "Instructor Team Lead",
      organization: "PyCode Academy",
      period: "2022 - Present",
      description: "Leading 10+ instructors to provide free online year-round CS education. Teaching Algorithms, Data Structures, and Python to students across the US.",
    },
    {
      role: "Co-Founder",
      organization: "Coding for Better Lives",
      period: "2021 - Present",
      description: "Nonprofit Improving computer literacy in underprivileged communities. Helped start a computer lab in a rural school in Sri Lanka.",
    },
    {
      role: "Assistant Senior Patrol Leader",
      organization: "Scout Troop 685",
      period: "July 2025 - Jan 2026",
      description: "Led a troop of 100+ scouts. Managed troop meetings, outings, and guided scouts on rank advancements. Eagle Candidate.",
    },
    {
      role: "President",
      organization: "Oak Valley Coding Club",
      period: "2020 - 2024",
      description: "Grew the club to 120+ members and taught competitive programming classes.",
    },
  ],
  education: [
    {
      school: "Del Norte High School",
      period: "2024 - Present",
      description: "Class of 2028. GPA: 4.24. Active in JV Swim Team.",
    },
    {
      school: "MathPath",
      period: "July 2024",
      description: "Selective residential math program. Studied Cryptology, Spherical Trig, and Group Theory.",
    },
    {
      school: "Art of Problem Solving",
      period: "2021 - Present",
      description: "Advanced coursework in Intermediate Python, Algebra, Number Theory, and Physics.",
    },
    {
      school: "San Diego Math Circle",
      period: "2020 - Present",
      description: "Participating in advanced mathematical problem-solving sessions and competitions.",
    },
  ],
  blogPosts: [
    {
      id: "art-of-building",
      title: "The Art of Building: Beyond the Ether",
      date: "March 2026",
      excerpt: "Why we should learn to build physical things-not just software in the ether, but LEGO, things in the yard, or even a spaceship.",
      content: `In an increasingly digital world, there's a growing temptation to stay entirely within the "ether" of software. We write code, deploy to servers, and see results on screens. But there is a unique, irreplaceable magic in building physical things.

Whether it's the tactile snap of two LEGO bricks, the grit of working on a car in the driveway, or building a structure in the yard, physical engineering teaches us about constraints that software often hides. Gravity, friction, and material fatigue are honest teachers. 

When you build a custom LEGO gearbox, you aren't just following instructions; you're learning how torque and speed trade off. This physical intuition makes you a better software engineer. It grounds your logic in reality. To all the builders out there: don't just stay in the code. Get your hands dirty. Build something you can touch.`,
      image: "https://picsum.photos/seed/building/800/600"
    },
    {
      id: "depth-of-passion",
      title: "The Hustle vs. The Deep Dive",
      date: "February 2026",
      excerpt: "Today everyone is hustling, but many-especially teens-don't put enough effort into mastering one area deeply.",
      content: `We live in the age of the "hustle." We are told to be everywhere, do everything, and have a dozen side projects. But in this rush to be broad, we are losing the art of being deep.

I see many of my peers jumping from one trend to another-one framework today, another tomorrow-without ever dwelling long enough to truly master the fundamentals. Mastery isn't found in the first 10 hours of a project; it's found in the 100th hour, when you're debugging a complex algorithm or refining a mechanical design.

Mastery requires a certain kind of stubbornness. It requires you to dwell deep in your passions even when it gets boring or difficult. If you want to build the future, don't just scratch the surface. Pick one thing that fascinates you and go as deep as you possibly can.`,
      image: "https://picsum.photos/seed/focus/800/600"
    },
    {
      id: "into-the-wild",
      title: "Into the Wild: Why I Love the Outdoors",
      date: "January 2026",
      excerpt: "The outdoors isn't just a place to hike; it's where I find perspective and leadership through scouting.",
      content: `As an Eagle Candidate and a Scout Leader, the outdoors has been my second classroom. There's a clarity that comes with being on a trail or under a canopy of trees that you simply can't find in a lab.

The outdoors teaches you resilience. When it rains on a trek, you don't stop; you adapt. When you're leading a troop of 100 scouts through the wilderness, you learn that leadership isn't about giving orders-it's about service and shared responsibility.

Engineering is often about solving problems for people. To do that well, you need to step away from the screen and experience the world as it is. The wild reminds us of the scale of things and the importance of building things that last.`,
      image: "https://picsum.photos/seed/outdoors/800/600",
      gallery: [
        "/outdoor1.jpg",
        "/outdoor2.jpg",
        "/outdoor3.jpg",
        "/outdoor4.jpg"
      ]
    },
    {
      id: "coming-soon",
      title: "Coming Soon",
      date: "April 2026",
      excerpt: "A new post is on the way. Check back soon for more thoughts on engineering, building, and leadership.",
      content: "This post is coming soon. Stay tuned!",
      image: "https://picsum.photos/seed/soon/800/600",
    }
  ],
  hobbies: [
    { name: "Soccer", icon: "Activity" },
    { name: "Building", icon: "Hammer" },
    { name: "Competitive Math", icon: "Calculator" },
    { name: "LEGO", icon: "Box" },
    { name: "Volunteering", icon: "Heart" },
  ],
  contact: {
    emailUser: "NuwanSDewa",
    emailDomain: "gmail.com",
    github: "https://github.com/CampfireCoding",
    linkedin: "https://www.linkedin.com/in/nuwan-dewasurendra/",
  }
};
