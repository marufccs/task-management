import { Footer } from 'flowbite-react';
import React from 'react';

const Footer2 = () => {
    return (
        <Footer container={true}>
  <div className="w-full text-center">
    <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
      <Footer.Brand
        href="/"
        src="https://img.freepik.com/free-vector/project-management-goal-completion-list-questionnaire-survey-answering-business-organization-tool_335657-3289.jpg?w=2000"
        alt="Task Management Logo"
        name="Task Management"
      />
      <Footer.LinkGroup className='hidden lg:flex'>
        <Footer.Link href="#">
          About
        </Footer.Link>
        <Footer.Link href="#">
          Privacy Policy
        </Footer.Link>
        <Footer.Link href="#">
          Licensing
        </Footer.Link>
        <Footer.Link href="#">
          Contact
        </Footer.Link>
      </Footer.LinkGroup>
    </div>
    <Footer.Divider />
    <Footer.Copyright
      href="#"
      by="Task Management"
      year={2023}
    />
  </div>
</Footer>
    );
};

export default Footer2;