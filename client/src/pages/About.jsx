import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">About Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            Learn more about University News, our mission, and how you can be a part of this journey.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mt-12 bg-white shadow-md rounded-lg p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 text-base sm:text-lg">
            At University News, we strive to provide timely, accurate, and relevant updates to students, staff, and the university community. 
            Our goal is to keep everyone informed about the latest events, achievements, and important announcements both inside and outside the campus.
          </p>
        </div>

        {/* How to Contribute Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contribution Section */}
          <div className="bg-white shadow-md rounded-lg p-6 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How You Can Contribute</h2>
            <p className="text-gray-600 mb-4">
              Are you passionate about sharing news and information? Here’s how you can contribute:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Submit news articles or reports on events happening in the university.</li>
              <li>Share achievements, research breakthroughs, or community stories.</li>
              <li>Provide feedback to improve the quality of our platform.</li>
            </ul>
            <p className="mt-4 text-gray-600">
              To get started, email us at{' '}
              <a href="mailto:universitynews@university.com" className="text-blue-600 hover:underline">
                universitynews@university.com
              </a>.
            </p>
          </div>

          {/* Admin Section */}
          <div className="bg-white shadow-md rounded-lg p-6 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Become an Admin</h2>
            <p className="text-gray-600 mb-4">
              Interested in managing articles and ensuring high-quality content on our platform? Here’s how you can become an admin:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Apply via our Admin Recruitment Form (available on request).</li>
              <li>Showcase your expertise in content creation and editing.</li>
              <li>Participate in an interview with our editorial team.</li>
            </ul>
            <p className="mt-4 text-gray-600">
              Admins play a crucial role in approving articles, monitoring submissions, and maintaining the platform's quality and integrity.
            </p>
          </div>
        </div>

        {/* Article Management Section */}
        <div className="mt-12 bg-white shadow-md rounded-lg p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">How We Manage Articles</h2>
          <p className="text-gray-600 text-base sm:text-lg">
            The process of managing articles on University News is systematic and efficient. Here’s how it works:
          </p>
          <ol className="list-decimal list-inside text-gray-600 space-y-2 mt-4">
            <li>
              <strong>Submission:</strong> Contributors submit articles through our platform or via email.
            </li>
            <li>
              <strong>Review:</strong> Articles are reviewed by our admin team for accuracy, relevance, and adherence to guidelines.
            </li>
            <li>
              <strong>Approval:</strong> Once approved, the article is published on the website.
            </li>
            <li>
              <strong>Feedback:</strong> Feedback from readers is gathered to improve future submissions.
            </li>
          </ol>
          <p className="mt-4 text-gray-600">
            Our system ensures that all content is well-curated and aligns with the university's standards and policies.
          </p>
        </div>

        {/* Call-to-Action Section */}
        <div className="mt-12 text-center bg-yellow-500 text-white rounded-lg py-8 px-6">
          <h2 className="text-3xl font-bold">Join Us in Building a Stronger University Community</h2>
          <p className="mt-4 text-lg">
            Be a part of our journey. Contribute, collaborate, and help us create a vibrant platform for the university.
          </p>
          <a
            href="mailto:universitynews@university.com"
            className="inline-block mt-6 bg-white text-yellow-500 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
