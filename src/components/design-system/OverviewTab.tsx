import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const OverviewTab = () => {
  return (
    <div className="space-y-6">

      {/* Personas Category */}
      <Card>
        <CardHeader>
          <CardTitle>Personas</CardTitle>
          <CardDescription>Representative users that guide our design focus</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          {/* Gearhead Greg */}
          <div className="border border-neutral-6 rounded-lg bg-white shadow-sm overflow-hidden transition-standard hover:shadow-md">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 h-40 md:h-auto bg-cover" style={{backgroundImage: 'url("https://d2kde5ohu8qb21.cloudfront.net/files/684f14cf7a225e0008ee0729/greg-profile2.jpg")', backgroundPosition: 'center 30%'}}></div>
              <div className="p-6 flex-1">
                <div className="flex items-center mb-3">
                  <div className="bg-motortrend-dark text-white rounded-full w-7 h-7 flex items-center justify-center font-bold mr-3">1</div>
                  <div>
                    <h3 className="typography-h3 text-color-neutral-1">Gearhead Greg</h3>
                    <div className="typography-caption text-color-neutral-3">(Enthusiast User)</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                  <div className="typography-body-sm"><span className="font-medium">Age:</span> 25–50</div>
                  <div className="typography-body-sm"><span className="font-medium">Occupation:</span> Engineer, mechanic, or hobbyist</div>
                  <div className="typography-body-sm"><span className="font-medium">Behaviors:</span> Consumes deep reviews, engine specs, dyno tests</div>
                  <div className="typography-body-sm"><span className="font-medium">Goals:</span> Stay on top of industry news, tune their ride</div>
                  <div className="typography-body-sm"><span className="font-medium">Channels:</span> Desktop, YouTube, forums</div>
                  <div className="typography-body-sm"><span className="font-medium">Needs:</span> Detailed performance data, mod guides</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Practical Paula */}
          <div className="border border-neutral-6 rounded-lg bg-white shadow-sm overflow-hidden transition-standard hover:shadow-md">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 h-40 md:h-auto bg-cover" style={{backgroundImage: 'url("https://d2kde5ohu8qb21.cloudfront.net/files/684f1535f48fe5000867d791/paula-profile.jpg")', backgroundPosition: 'center 25%'}}></div>
              <div className="p-6 flex-1">
                <div className="flex items-center mb-3">
                  <div className="bg-motortrend-dark text-white rounded-full w-7 h-7 flex items-center justify-center font-bold mr-3">2</div>
                  <div>
                    <h3 className="typography-h3 text-color-neutral-1">Practical Paula</h3>
                    <div className="typography-caption text-color-neutral-3">(Everyday Car Shopper)</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                  <div className="typography-body-sm"><span className="font-medium">Age:</span> 35–55</div>
                  <div className="typography-body-sm"><span className="font-medium">Occupation:</span> Working parent</div>
                  <div className="typography-body-sm"><span className="font-medium">Behaviors:</span> Compares safety, price, reliability</div>
                  <div className="typography-body-sm"><span className="font-medium">Goals:</span> Buy or lease a safe, affordable family car</div>
                  <div className="typography-body-sm"><span className="font-medium">Channels:</span> Mobile, Google Search, Facebook</div>
                  <div className="typography-body-sm"><span className="font-medium">Needs:</span> Clear rankings, buying guides, dealership info</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Social Sara */}
          <div className="border border-neutral-6 rounded-lg bg-white shadow-sm overflow-hidden transition-standard hover:shadow-md">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 h-40 md:h-auto bg-cover" style={{backgroundImage: 'url("https://d2kde5ohu8qb21.cloudfront.net/files/6837f71e7a1c8100081798fe/image11.jpg")', backgroundPosition: 'center 20%'}}></div>
              <div className="p-6 flex-1">
                <div className="flex items-center mb-3">
                  <div className="bg-motortrend-dark text-white rounded-full w-7 h-7 flex items-center justify-center font-bold mr-3">3</div>
                  <div>
                    <h3 className="typography-h3 text-color-neutral-1">Social Sara</h3>
                    <div className="typography-caption text-color-neutral-3">(Social Media Auto Enthusiast)</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                  <div className="typography-body-sm"><span className="font-medium">Age:</span> 22-35</div>
                  <div className="typography-body-sm"><span className="font-medium">Occupation:</span> 9-to-5 office clerk</div>
                  <div className="typography-body-sm"><span className="font-medium">Habits:</span> Scrolls TikTok/IG Reels, saves car clips</div>
                  <div className="typography-body-sm"><span className="font-medium">Goals:</span> Keep up with car buzz, dream about next ride</div>
                  <div className="typography-body-sm"><span className="font-medium">Channels:</span> TikTok, IG Reels, YouTube Shorts</div>
                  <div className="typography-body-sm"><span className="font-medium">Needs:</span> Short videos, bold thumbnails, one-tap sharing</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Design Principles</CardTitle>
          <CardDescription>Core principles that guide our design decisions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Design for People, Drive Impact */}
          <div className="border border-neutral-6 rounded-lg overflow-hidden">
            <div className="bg-blue-50 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xl font-semibold mb-1">1</div>
                  <h3 className="typography-title text-neutral-1 text-2xl font-bold mb-2">Design for People, Drive Impact</h3>
                  <div className="inline-block bg-gray-900 text-white rounded-full px-4 py-1 text-sm font-medium">
                    User value unlocks business value
                  </div>
                </div>
                <div className="text-blue-600">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 8C18.1201 8.00076 16.2783 8.55392 14.7144 9.58722C13.1505 10.6205 11.9345 12.083 11.217 13.7791C10.4996 15.4752 10.3124 17.3324 10.6798 19.1204C11.0473 20.9083 11.9515 22.5422 13.28 23.8L20 30L26.72 23.8C27.9621 22.6044 28.8336 21.0915 29.2289 19.4457C29.6242 17.7999 29.5274 16.0794 28.9499 14.4841C28.3724 12.8889 27.3389 11.4835 25.9866 10.4333C24.6343 9.38302 23.0157 8.73288 21.32 8.57C20.88 8.52 20.44 8.5 20 8Z" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19.5 22C21.9853 22 24 19.9853 24 17.5C24 15.0147 21.9853 13 19.5 13C17.0147 13 15 15.0147 15 17.5C15 19.9853 17.0147 22 19.5 22Z" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 p-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Our users will:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Feel seen, understood, and supported</span> through intuitive interfaces that align with real human needs, behaviors.
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Engage with our content</span> because of the delightful experiences we provide
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Our designs must:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Align business impact</span> with user success (e.g., conversions = solved need)
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Start with empathy,</span> design based on research, not assumptions
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Prioritize usability</span> over novelty
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Solve real problems</span> in context, not just feature requests
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Design Psychology</h4>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Empathy Gap</h5>
                  <p className="text-sm text-neutral-4 mb-3">People underestimate how much behavior is situation-dependent</p>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Goal Gradient Effect</h5>
                  <p className="text-sm text-neutral-4">People increase progress when they're closer to their goal. Design should prioritize progress.</p>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Design must be</h5>
                  <p className="text-sm text-neutral-4">grounded in data, not internal opinion.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-6 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-xs uppercase text-neutral-4 mb-3">Areas</h5>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full">Brand/Look/Feel</div>
                    <div className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full">Personalization</div>
                    <div className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full">Engagement</div>
                    <div className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full">Immersive Storytelling</div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-xs uppercase text-neutral-4 mb-3">Methods/Activities</h5>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Personas</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Data Ethnography</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Research Brief</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">UX/Content Research</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">User Stories</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Consider the Entire Experience */}
          <div className="border border-neutral-6 rounded-lg overflow-hidden">
            <div className="bg-blue-50 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xl font-semibold mb-1">2</div>
                  <h3 className="typography-title text-neutral-1 text-2xl font-bold mb-2">Consider the Entire Experience</h3>
                  <div className="inline-block bg-gray-900 text-white rounded-full px-4 py-1 text-sm font-medium">
                    Design the journey, not just the feature
                  </div>
                </div>
                <div className="text-blue-600">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 8L8 14V26L20 32L32 26V14L20 8Z" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 16L14 19V25L20 28L26 25V19L20 16Z" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 p-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Our users will:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Encounter a seamless, consistent journey</span> across all touchpoints — from discovery to engagement to resolution.
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Our designs must:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Design beyond isolated screens</span> — consider before, during, and after the core interaction
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Provide clear signposting</span> throughout the journey
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Design Psychology</h4>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Peak-End Rule</h5>
                  <p className="text-sm text-neutral-4 mb-3">People judge an experience by its peak and how it ends</p>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Zeigarnik Effect</h5>
                  <p className="text-sm text-neutral-4">People remember incomplete tasks better than completed ones</p>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Serial Position Effect</h5>
                  <p className="text-sm text-neutral-4">People recall the first and last items of a list</p>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-6 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-xs uppercase text-neutral-4 mb-3">Areas</h5>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full">Article Layout</div>
                    <div className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full">Commercial UI</div>
                    <div className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full">Navigation</div>
                    <div className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full">Search</div>
                    <div className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full">Forms</div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-xs uppercase text-neutral-4 mb-3">Methods/Activities</h5>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Storyboard/Kano</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Journey Map</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">User Flows</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">UXR Surveys</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">UXR Scenarios</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Innovate with Purpose */}
          <div className="border border-neutral-6 rounded-lg overflow-hidden">
            <div className="bg-blue-50 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xl font-semibold mb-1">3</div>
                  <h3 className="typography-title text-neutral-1 text-2xl font-bold mb-2">Innovate with Purpose</h3>
                  <div className="inline-block bg-gray-900 text-white rounded-full px-4 py-1 text-sm font-medium">
                    Bold ideas grounded in value
                  </div>
                </div>
                <div className="text-blue-600">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 8L8 14V26L20 32L32 26V14L20 8Z" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 16L14 19V25L20 28L26 25V19L20 16Z" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 p-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Our users will:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Look for useful tools</span> that enhance their reading experience
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Search for similar tools</span> they've used in seeing on other article sites
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Look for content</span> that matches their interests
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Our designs must:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Meet the user where they are</span> in their user journey to add value
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Be tested with real users</span> early to identify pain points
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Make sure we reference</span> industry standard patterns that are familiar
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Have the ability</span> to personalize content for the user
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Design Psychology</h4>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Decision Support</h5>
                  <p className="text-sm text-neutral-4 mb-3">Gathering data, opinions, and comparisons to help make choices</p>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Default/Expectations Bias</h5>
                  <p className="text-sm text-neutral-4">Users tend not to change an established behavior</p>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Endowment Effects</h5>
                  <p className="text-sm text-neutral-4">Users value something more if they feel it's theirs</p>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-6 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-xs uppercase text-neutral-4 mb-3">Areas</h5>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full">Article Reading</div>
                    <div className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full">Article Layout</div>
                    <div className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full">Navigation</div>
                    <div className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full">Affiliates</div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-xs uppercase text-neutral-4 mb-3">Methods/Activities</h5>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Competitive Analysis</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Research & Design Brief</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Prototype</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Reference Brand Guidelines</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Be Clear in the Story You're Telling */}
          <div className="border border-neutral-6 rounded-lg overflow-hidden">
            <div className="bg-blue-50 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xl font-semibold mb-1">4</div>
                  <h3 className="typography-title text-neutral-1 text-2xl font-bold mb-2">Be Clear in the Story You're Telling</h3>
                  <div className="inline-block bg-gray-900 text-white rounded-full px-4 py-1 text-sm font-medium">
                    Lead with narrative, not noise
                  </div>
                </div>
                <div className="text-blue-600">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 10H28V14H12V10Z" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 18H28V22H12V18Z" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 26H20V30H12V26Z" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 p-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Our users will:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Scan main points</span> of content and stay on those articles for longer
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Intuitively understand</span> how to interact with interface elements without instruction
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Look for automation</span> or quick summaries under editorial guidance
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Our designs must:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Consider editorial voice</span> and how it affects brand perception
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Be consistent</span> with existing design system elements
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Follow a clear</span> information and visual hierarchy
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Include necessary</span> onboarding (tooltips)
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Refrain from</span> diluting UX with robotic language or generic layouts
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Design Psychology</h4>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Banner Blindness</h5>
                  <p className="text-sm text-neutral-4 mb-3">Users tend to ignore elements that appear repeatedly</p>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Visual Hierarchy</h5>
                  <p className="text-sm text-neutral-4">The order in which people notice visual elements</p>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Mental Model</h5>
                  <p className="text-sm text-neutral-4">Users have unconscious opinions of how things work</p>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-6 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-xs uppercase text-neutral-4 mb-3">Areas</h5>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full">Article Layout</div>
                    <div className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full">Article Templates</div>
                    <div className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full">Navigation</div>
                    <div className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full">Affiliates</div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-xs uppercase text-neutral-4 mb-3">Methods/Activities</h5>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Storyboard Review</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Design Workshop</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Design Flow</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Reference Design Systems</div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Design for Trust in Every Touchpoint */}
          <div className="border border-neutral-6 rounded-lg overflow-hidden">
            <div className="bg-orange-50 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xl font-semibold mb-1">5</div>
                  <h3 className="typography-title text-neutral-1 text-2xl font-bold mb-2">Design for Trust in Every Touchpoint</h3>
                  <div className="inline-block bg-gray-900 text-white rounded-full px-4 py-1 text-sm font-medium">
                    Trust is cultivated in every micro-moment
                  </div>
                </div>
                <div className="text-orange-600">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 8L8 14V26L20 32L32 26V14L20 8Z" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 16V28" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 19L26 19" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 p-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Our users will:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Have assurance</span> of their concerns
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Will understand exactly</span> what will happen throughout each touchpoint
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Our designs must:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Proactively provide</span> information to reassure users of their concerns
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Provide success/error</span> feedback
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Make it clear</span> what the next step is
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Use clear & consistent</span> labels
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Make changes incrementally</span> or opt-in large changes
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Consistently incorporate</span> user feedback
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Design Psychology</h4>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Signifiers</h5>
                  <p className="text-sm text-neutral-4 mb-3">Elements that communicate what they will do</p>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1">External Trigger</h5>
                  <p className="text-sm text-neutral-4">When the information structure builds to arrive the general goal</p>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Weber's Law</h5>
                  <p className="text-sm text-neutral-4">Users need subtle to small incremental changes</p>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Feedback Loop</h5>
                  <p className="text-sm text-neutral-4">When users understand feedback communicates all happened</p>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-6 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-xs uppercase text-neutral-4 mb-3">Areas</h5>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-orange-50 text-orange-800 text-xs px-3 py-1 rounded-full">Every Touchpoint</div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-xs uppercase text-neutral-4 mb-3">Methods/Activities</h5>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Critique</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Pilot/Align</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">User Testing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Strong Systems, Thoughtful Flexibility */}
          <div className="border border-neutral-6 rounded-lg overflow-hidden">
            <div className="bg-green-50 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xl font-semibold mb-1">6</div>
                  <h3 className="typography-title text-neutral-1 text-2xl font-bold mb-2">Strong Systems, Thoughtful Flexibility</h3>
                  <div className="inline-block bg-gray-900 text-white rounded-full px-4 py-1 text-sm font-medium">
                    Build the foundation once, personalize where it counts
                  </div>
                </div>
                <div className="text-green-600">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 20C12 16.6863 14.6863 14 18 14H22C25.3137 14 28 16.6863 28 20V26H12V20Z" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 14V12C16 10.8954 16.8954 10 18 10H22C23.1046 10 24 10.8954 24 12V14" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 p-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Our users will:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Feel confident</span> navigating a consistent experience while enjoying meaningful flexibility that adapts to their unique needs
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Our designs must:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Balance structure with adaptability</span>. Our core components, patterns, and interactions should be clear, reusable, and scalable for efficiency and cohesion.
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Design Psychology</h4>
                <div>
                  <h5 className="font-semibold text-sm mb-1">The IKEA Effect</h5>
                  <p className="text-sm text-neutral-4">fits because it emphasizes giving users the ability to co-create their experiences. By allowing users to personalize aspects of a system they develop emotional investment and a sense of ownership for the product.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-6 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-xs uppercase text-neutral-4 mb-3">Areas</h5>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-green-50 text-green-800 text-xs px-3 py-1 rounded-full">Foundation UI Components</div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-xs uppercase text-neutral-4 mb-3">Methods/Activities</h5>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Finalized Assets</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Annotation & Docs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sweat the Details */}
          <div className="border border-neutral-6 rounded-lg overflow-hidden">
            <div className="bg-green-50 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xl font-semibold mb-1">7</div>
                  <h3 className="typography-title text-neutral-1 text-2xl font-bold mb-2">Sweat the Details</h3>
                  <div className="inline-block bg-gray-900 text-white rounded-full px-4 py-1 text-sm font-medium">
                    Small touches, big impact
                  </div>
                </div>
                <div className="text-green-600">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 20C12 16.6863 14.6863 14 18 14H22C25.3137 14 28 16.6863 28 20V26H12V20Z" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 14V12C16 10.8954 16.8954 10 18 10H22C23.1046 10 24 10.8954 24 12V14" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 p-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Our users will:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Experience improved usability</span> and delight. Attention to spacing, alignment, contrast, interface elements results in reduced cognitive load.
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Perceive Us as Trustworthy</span> and Credible. Consistency and attention to detail signal to users that the product is reliable and thoroughly designed/delivered.
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Our designs must:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Polish Visual Hierarchy</span>. Fine-tune spacing/padding, alignment, and contrast. Sort check font faces, colors, shadows. Work for consistency across the mobile/desktop sizing, responsive breakpoints, assets, or PDFs uploaded to development.
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Collaborate with Engineers</span> to Fine-Tune. Work closely with developers to ensure implementation matches the design. Verify animations and effects are smooth, all elements have complete lists in translation.
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Design Psychology</h4>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Zeigarnik Effect</h5>
                  <p className="text-sm text-neutral-4 mb-3">Unfinished or unpolished work leaves users feeling incomplete or uneasy. Achieving even UI fine-tweaks frees feelings and ensures a clean, resolved experience.</p>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Aesthetic-Usability Effect</h5>
                  <p className="text-sm text-neutral-4 mb-3">A coherent, visually appealing design is more likely to be perceived as easy to use. Details like beautiful typography, transitions, or spacing subconsciously create trust.</p>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Law of Prägnanz (Good Gestalt)</h5>
                  <p className="text-sm text-neutral-4 mb-3">People naturally prefer simplicity and order. Clear alignment, spacing, and visual depth guide the user through the experience smoothly.</p>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Law of Proximity</h5>
                  <p className="text-sm text-neutral-4">Elements close to each other are visually connected/related</p>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-6 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-xs uppercase text-neutral-4 mb-3">Areas</h5>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-green-50 text-green-800 text-xs px-3 py-1 rounded-full">Micro-interactions</div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-xs uppercase text-neutral-4 mb-3">Methods/Activities</h5>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Finalized Assets</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Annotation & Docs</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Design QA</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Web/Front/Engineer Handoff</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Show Present Live After Design QA</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Web/Front/Eng Design Reviews & Leadership</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Benchmark Study</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Design to Learn */}
          <div className="border border-neutral-6 rounded-lg overflow-hidden">
            <div className="bg-green-50 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xl font-semibold mb-1">8</div>
                  <h3 className="typography-title text-neutral-1 text-2xl font-bold mb-2">Design to Learn</h3>
                  <div className="inline-block bg-gray-900 text-white rounded-full px-4 py-1 text-sm font-medium">
                    Learn from users, evolve your design
                  </div>
                </div>
                <div className="text-green-600">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 20C12 16.6863 14.6863 14 18 14H22C25.3137 14 28 16.6863 28 20V26H12V20Z" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 14V12C16 10.8954 16.8954 10 18 10H22C23.1046 10 24 10.8954 24 12V14" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 p-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Our users will:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Provide ongoing feedback</span> through touchpoints, enabling our designs to remain iterative and aligned with evolving expectations.
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Our designs must:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Embrace flexibility</span> and continuously iterate based on insights from research, Google Analytics, surveys, and other data sources. These findings should be thoroughly analyzed and thoughtfully applied to both existing and future designs as needed.
                  </li>
                  <li className="pb-2 border-b border-neutral-6">
                    <span className="font-medium">Our design process</span> should be viewed as an ongoing journey, not a one-time solution to a single problem. It's important to consider the broader narrative and the complete story behind our work.
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase text-neutral-4">Design Psychology</h4>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Mental Model</h5>
                  <p className="text-sm text-neutral-4 mb-3">Users have a preconceived opinion of how things work</p>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Curiosity Gap</h5>
                  <p className="text-sm text-neutral-4 mb-3">Users have a desire to seek out missing information</p>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Shaping</h5>
                  <p className="text-sm text-neutral-4 mb-3">Competently reinforcing actions to get closer to a target behavior</p>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Observer-Expectancy Effect</h5>
                  <p className="text-sm text-neutral-4 mb-3">People unknowingly influence how much a person's influence user behaviors</p>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1">Empathy Gap</h5>
                  <p className="text-sm text-neutral-4">When researchers' biases influence the participants of an experiment</p>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-6 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-xs uppercase text-neutral-4 mb-3">Areas</h5>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-green-50 text-green-800 text-xs px-3 py-1 rounded-full">All Areas</div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-xs uppercase text-neutral-4 mb-3">Methods/Activities</h5>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Post-Launch Analysis Report</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Benchmark Study</div>
                    <div className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full">Post Launch Surveys</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other principles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 border border-neutral-6 p-4 rounded-lg">
              <h3 className="typography-title text-neutral-1">Consistency</h3>
              <p className="typography-body text-neutral-4">
                Uniform patterns and components across all interfaces
              </p>
            </div>
            <div className="space-y-2 border border-neutral-6 p-4 rounded-lg">
              <h3 className="typography-title text-neutral-1">Accessibility</h3>
              <p className="typography-body text-neutral-4">
                Inclusive design that works for all users
              </p>
            </div>
            <div className="space-y-2 border border-neutral-6 p-4 rounded-lg">
              <h3 className="typography-title text-neutral-1">Performance</h3>
              <p className="typography-body text-neutral-4">
                Optimized components for fast loading and smooth interactions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Atomic Design Structure</CardTitle>
          <CardDescription>Our component hierarchy follows atomic design principles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="p-4 border border-neutral-6 rounded-lg">
              <h4 className="typography-title text-neutral-1 mb-2">Atoms</h4>
              <p className="typography-caption text-neutral-4 mb-3">Basic building blocks</p>
              <ul className="typography-small text-neutral-4 space-y-1">
                <li>• Buttons</li>
                <li>• Icons</li>
                <li>• Typography</li>
                <li>• Colors</li>
              </ul>
            </div>
            <div className="p-4 border border-neutral-6 rounded-lg">
              <h4 className="typography-title text-neutral-1 mb-2">Molecules</h4>
              <p className="typography-caption text-neutral-4 mb-3">Simple component groups</p>
              <ul className="typography-small text-neutral-4 space-y-1">
                <li>• Search Bar</li>
                <li>• Form Fields</li>
                <li>• Card Headers</li>
                <li>• Navigation Items</li>
              </ul>
            </div>
            <div className="p-4 border border-neutral-6 rounded-lg">
              <h4 className="typography-title text-neutral-1 mb-2">Organisms</h4>
              <p className="typography-caption text-neutral-4 mb-3">Complex component groups</p>
              <ul className="typography-small text-neutral-4 space-y-1">
                <li>• Car Cards</li>
                <li>• Article Cards</li>
                <li>• Navigation Bar</li>
                <li>• Garage Stats</li>
              </ul>
            </div>
            <div className="p-4 border border-neutral-6 rounded-lg">
              <h4 className="typography-title text-neutral-1 mb-2">Templates</h4>
              <p className="typography-caption text-neutral-4 mb-3">Page-level layouts</p>
              <ul className="typography-small text-neutral-4 space-y-1">
                <li>• Dashboard</li>
                <li>• Garage</li>
                <li>• Car Research</li>
                <li>• Article Pages</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
