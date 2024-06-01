function calculateProfileCompletion(profile: any, resume: any): string {
    let totalFields = 0;
    let filledFields = 0;

    // Profile Fields
    const profileFields = [
        'name', 'bio', 'address', 'country', 'city', 'pincode',
        'state', 'avatar', 'qualification', 'experience', 'dob',
        'gender', 'contact_email'
    ];
    totalFields += profileFields.length;
    profileFields.forEach(field => {
        if (profile && profile[field]) filledFields++;
    });

    // Social Links
    if (profile && Array.isArray(profile.social_links)) {
        totalFields += 2;
        filledFields += profile.social_links.length;
    }

    // Resume Fields
    const resumeFields = ['resume', 'overview', 'video','skills', 'experiences', 'educations', 'projects'];
    totalFields += resumeFields.length;
    resumeFields.forEach(field => {
        if (resume && resume[field]) filledFields++;
    });

    // Education
    if (resume && Array.isArray(resume.educations)) {
        totalFields += resume.educations.length * 4; // title, college, from, to
        resume.educations.forEach((education: { title: any; college: any; from: any; to: any; }) => {
            if (education.title) filledFields++;
            if (education.college) filledFields++;
            if (education.from) filledFields++;
            if (education.to) filledFields++;
        });
    }

    // Skills
    if (resume && Array.isArray(resume.skills)) {
        totalFields += 1; // Considering all skills together
        if (resume.skills.length > 0) filledFields++;
    }

    // Experiences
    if (resume && Array.isArray(resume.experiences)) {
        totalFields += resume.experiences.length * 4; // title, company, from, to
        resume.experiences.forEach((experience: { title: any; company: any; from: any; to: any; }) => {
            if (experience.title) filledFields++;
            if (experience.company) filledFields++;
            if (experience.from) filledFields++;
            if (experience.to) filledFields++;
        });
    }

    // Projects
    if (resume && Array.isArray(resume.projects)) {
        totalFields += resume.projects.length * 3; // title, description, url
        resume.projects.forEach((project: { title: any; description: any; url: any; }) => {
            if (project.title) filledFields++;
            if (project.description) filledFields++;
            if (project.url) filledFields++;
        });
    }

    // Calculate percentage
    const completionPercentage = (filledFields / totalFields) * 100;
    return completionPercentage.toFixed(2);
}

export default calculateProfileCompletion;
