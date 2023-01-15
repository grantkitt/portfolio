import Container from "./Container";
import CompContainer from "./CompContainer";
import Gamma from "./gamma";
const Intro = () => {
  return (
    <div className="w-screen bg-blue-800 text-white">
    <div className="py-10 w-2/5 mx-auto">
        <div className="flex flex-row justify-center font-bold text-3xl mx-auto">
            <a target="_blank" href='https://drive.google.com/file/d/19OIh2KxMwyJnZRUUn7xFo3mpC4LKjtBc/view?usp=sharing'>
                <h1>RESUME</h1>
            </a>
            <h1 className="font-semibold mx-auto">Grant Kitlowski</h1>
            
            <h1 className="cursor-pointer">CONTACT</h1>
            
        </div>
        <p className="text-justify text-xl font-medium mx-auto mt-5 ">Hey, I'm <span className="text-yellow-300 font-bold">Grant Kitlowski</span>. I am a fully self-taught programmer and engineer with a passion for building cool products. Currently, I'm studying at the <span className="font-bold text-orange-400">University of Texas at Austin</span> studying Aerospace Engineering and Computer Science. I'm lucky to have worked with some incredible people, including spending some time as a founder in residence at <span className="font-bold text-red-500">Antler</span>. Checkout some of the stuff I've worked on below.</p>
        <h1 className="w-full p-2 bg-white border-black border-4 rounded-xl text-xl text-black font-semibold text-center my-10 shadow-2xl">These are some projects I'm proud of.</h1>
        <Container title='Gamma' tColor='text-purple-400' skills='flutter dart javascript react.js next.js golang psql docker makefiles aws fly.io git' pic='https://i.imgur.com/MqB5OUh.png' children={<p className="font-semibold text-lg text-white text-justify mt-5">Gamma was built to make managing social events easier. The application allowed social organizations to manage members and event invitees, as well as provide security through QR and NFC ticketing. Part of <span className="font-bold text-red-500">Antler</span> c/o 2022.</p>}/>
        <Container title='Gazelle Ecosolutions' tColor='text-green-400' rev='flex-row-reverse' pic='https://i.imgur.com/6DbgHm9.png' skills='flutter dart golang docker psql makefiles python git' children={<p className="font-semibold text-lg text-white text-justify mt-5">Gazelle Ecosolutions was built to help Botswana ranch owners manage their land. By methodically calculating the carrying capacity of certain livestock compared to available foliage, the app determines the ideal amounts of each animal to prevent overgrazing and promote the growth of vegetation. This creates carbon credits which can then be sold to other companies.</p>}/>
        <CompContainer title='MovablesATX' pic='https://i.imgur.com/nmWVwc5.png' tColor='text-orange-300' skills='javascript react.js shopify-hydrogen graphql git' children={<p className="font-semibold text-lg text-white text-justify mt-5">MovablesATX was built as an ecommerce platform for a vintage furnature and home decoration company. They wanted a very flowy and elegant feel with their own ideas for design, and so I helped them make that a reality.</p>}/>
    </div>
    </div>
  )
}

export default Intro;

