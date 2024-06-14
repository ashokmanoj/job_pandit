interface Education {
    title?: string;
    college?: string;
    from?: string;
    to?: string;
}

interface Experience {
    title?: string;
    company?: string;
    from?: string;
    to?: string;
}

interface Project {
    title?: string;
    description?: string;
    url?: string;
}

interface Achievement {
    title?: string;
    description?: string;
}

interface Profile {
    id?: string;
    created_at?: string;
    name?: string;
    bio?: string;
    address?: string;
    country?: string;
    city?: string;
    pincode?: string;
    state?: string;
    avatar?: string;
    social_links?: any[];
    qualification?: string;
    experience?: string;
    dob?: string;
    gender?: string;
    mapSrc?: string;
    contact_email?: string;
    resume?: string;
    overview?: string;
    video?: string;
    educations?: Education[];
    skills?: string[];
    experiences?: Experience[];
    projects?: Project[];
    achievements?: Achievement[];
}

function calculateProfileCompletion(profile: Profile): string {
    let totalFields = 0;
    let filledFields = 0;

    // Profile Fields
    const profileFields: (keyof Profile)[] = [
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
    const resumeFields: (keyof Profile)[] = ['resume', 'overview', 'video', 'skills', 'experiences', 'educations', 'projects', 'achievements'];
    totalFields += resumeFields.length;
    resumeFields.forEach(field => {
        if (profile && profile[field]) filledFields++;
    });

    // Education
    if (profile && Array.isArray(profile.educations)) {
        totalFields += profile.educations.length * 4;
        profile.educations.forEach(edu => {
            ['title', 'college', 'from', 'to'].forEach(field => {
                if (edu && edu[field as keyof Education]) filledFields++;
            });
        });
    }

    // Skills
    if (profile && Array.isArray(profile.skills)) {
        totalFields += 1;
        if (profile.skills.length > 0) filledFields++;
    }

    // Experiences
    if (profile && Array.isArray(profile.experiences)) {
        totalFields += profile.experiences.length * 4;
        profile.experiences.forEach(exp => {
            ['title', 'company', 'from', 'to'].forEach(field => {
                if (exp && exp[field as keyof Experience]) filledFields++;
            });
        });
    }

    // Projects
    if (profile && Array.isArray(profile.projects)) {
        totalFields += profile.projects.length * 3;
        profile.projects.forEach(proj => {
            ['title', 'description', 'url'].forEach(field => {
                if (proj && proj[field as keyof Project]) filledFields++;
            });
        });
    }

    // Achievements
    if (profile && Array.isArray(profile.achievements)) {
        totalFields += profile.achievements.length * 2;
        profile.achievements.forEach(ach => {
            ['title', 'description'].forEach(field => {
                if (ach && ach[field as keyof Achievement]) filledFields++;
            });
        });
    }

    const completionPercentage = (filledFields / totalFields) * 100;
    return completionPercentage.toFixed(2);
}

export default calculateProfileCompletion