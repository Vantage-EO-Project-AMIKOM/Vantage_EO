<template>
    <footer class="fixed bottom-0 z-0 w-full h-auto">
        <div class=" w-full max-w-4/5 mx-auto pb-20">

            <div
                class=" w-full h-auto bg-[#FF0000] rounded-4xl sm:rounded-full flex flex-col lg:flex-row justify-between items-center p-5 md:p-10 lg:p-15 mb-10">
                <h2 class=" text-3xl xl:text-4xl text-center text-white lg:text-left font-bold mb-3 lg:mb-0">Subscribe
                    to Our Newsletter</h2>

                <div class=" flex w-full md:w-6/7 xl:w-1/2 h-15 items-center">
                    <input type="email" class=" w-2/3 h-full bg-white rounded-l-full py-5 px-8 text-lg outline-none"
                        placeholder="Your email address">
                    <button
                        class=" w-1/3 h-full bg-[#2B3B4C] rounded-r-full text-lg capitalize hover:bg-[#4c5053] text-white cursor-pointer">subscribe</button>
                </div>
            </div>

            <div class=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-4">

                <div class=" min-h-60 flex flex-col items-start relative">
                    <RouterLink to="#" class=" flex justify-center items-center mb-4">
                        <img src="./img/onlyLogo.png" alt="Logo" class="h-8 lg:h-10 w-auto mr-2" draggable="false">
                        <p class=" text-xl font-bold text-white">Vantage</p>
                    </RouterLink>

                    <p class=" text-md text-justify text-white">Vantage adalah platform web event organizer yang
                        memudahkan
                        pembuatan, pengelolaan, dan
                        pelaksanaan acara secara praktis dan terintegrasi dalam satu sistem.</p>

                    <div class="flex absolute bottom-0 left-0">

                        <div
                            class=" w-13 h-13 bg-[#FF0000] rounded-full mr-2 text-2xl flex justify-center items-center transition-all">
                            <svg width="800px" height="800px" viewBox="0 0 24 24" id="facebook" data-name="Flat Color"
                                xmlns="http://www.w3.org/2000/svg" class=" w-8 h-8 fill-white">
                                <path id="primary"
                                    d="M14,6h3a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H14A5,5,0,0,0,9,7v3H7a1,1,0,0,0-1,1v2a1,1,0,0,0,1,1H9v7a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V14h2.22a1,1,0,0,0,1-.76l.5-2a1,1,0,0,0-1-1.24H13V7A1,1,0,0,1,14,6Z">
                                </path>
                            </svg>
                        </div>
                        <div
                            class=" w-13 h-13 bg-[#FF0000] rounded-full mr-2 text-2xl flex justify-center items-center transition-all">
                            <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                data-name="Layer 1" class=" w-8 h-8 fill-white">
                                <path
                                    d="M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.3,7.3,0,0,0-2.43.47A4.78,4.78,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.78,4.78,0,0,0,1.77,1.15,7.3,7.3,0,0,0,2.43.47C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.3,7.3,0,0,0,2.43-.47,4.7,4.7,0,0,0,1.77-1.15,4.85,4.85,0,0,0,1.16-1.77,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.06,3.06,0,0,1-.75,1.15,3.19,3.19,0,0,1-1.15.75,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.73,5.73,0,0,1,6.1,19.8,3.27,3.27,0,0,1,5,19.05a3,3,0,0,1-.74-1.15A5.54,5.54,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.54,5.54,0,0,1,4.21,6.1,3,3,0,0,1,5,5,3.14,3.14,0,0,1,6.1,4.2,5.73,5.73,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34A3.06,3.06,0,0,1,19.05,5,3.06,3.06,0,0,1,19.8,6.1,5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16ZM12,6.87A5.13,5.13,0,1,0,17.14,12,5.12,5.12,0,0,0,12,6.87Zm0,8.46A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z" />
                            </svg>
                        </div>
                        <div
                            class=" w-13 h-13 bg-[#FF0000] text-white rounded-full mr-2 text-2xl flex justify-center items-center transition-all">
                            <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                data-name="Layer 1" class=" w-8 h-8 fill-white">
                                <path
                                    d="M23,9.71a8.5,8.5,0,0,0-.91-4.13,2.92,2.92,0,0,0-1.72-1A78.36,78.36,0,0,0,12,4.27a78.45,78.45,0,0,0-8.34.3,2.87,2.87,0,0,0-1.46.74c-.9.83-1,2.25-1.1,3.45a48.29,48.29,0,0,0,0,6.48,9.55,9.55,0,0,0,.3,2,3.14,3.14,0,0,0,.71,1.36,2.86,2.86,0,0,0,1.49.78,45.18,45.18,0,0,0,6.5.33c3.5.05,6.57,0,10.2-.28a2.88,2.88,0,0,0,1.53-.78,2.49,2.49,0,0,0,.61-1,10.58,10.58,0,0,0,.52-3.4C23,13.69,23,10.31,23,9.71ZM9.74,14.85V8.66l5.92,3.11C14,12.69,11.81,13.73,9.74,14.85Z" />
                            </svg>
                        </div>
                        <div
                            class=" w-13 h-13 bg-[#FF0000] text-white rounded-full mr-2 text-2xl flex justify-center items-center transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor"
                                fill-rule="evenodd" class=" w-8 h-8">
                                <path
                                    d="M818 800 498.11 333.745l.546.437L787.084 0h-96.385L455.738 272 269.15 0H16.367l298.648 435.31-.036-.037L0 800h96.385l261.222-302.618L565.217 800zM230.96 72.727l448.827 654.546h-76.38L154.217 72.727z"
                                    transform="translate(103 112)" />
                            </svg>
                        </div>

                    </div>
                </div>

                <div class=" flex justify-start md:justify-center">
                    <div class=" flex flex-col items-start">
                        <h3 class=" text-3xl font-bold text-white text-left capitalize mb-5">quick links</h3>
                        <RouterLink to="/"
                            class="text-white my-2 transition-all hover:text-[#788663] hover:translate-x-1">Home
                        </RouterLink>
                        <RouterLink to="about"
                            class="text-white my-2 transition-all hover:text-[#788663] hover:translate-x-1">
                            About</RouterLink>
                        <RouterLink to="#"
                            class="text-white my-2 transition-all hover:text-[#788663] hover:translate-x-1">Events
                        </RouterLink>
                        <RouterLink to="#"
                            class="text-white my-2 transition-all hover:text-[#788663] hover:translate-x-1">
                            Speakers</RouterLink>
                        <RouterLink to="ourHistory"
                            class="text-white my-2 transition-all hover:text-[#788663] hover:translate-x-1">Our Story
                        </RouterLink>
                        <RouterLink to="contact"
                            class="text-white my-2 transition-all hover:text-[#788663] hover:translate-x-1">Contact
                            Us</RouterLink>
                    </div>
                </div>

                <div class=" flex flex-col items-start">
                    <h3 class=" text-3xl font-bold text-white text-left capitalize mb-5">upcoming events</h3>
                    <div class=" w-full h-full grid grid-rows-2 gap-4">

                        <div class=" w-full h-full grid grid-cols-3 transition-all hover:scale-102 rounded-2xl">
                            <div class=" overflow-hidden">
                                <img src="./img/post/pf.jpeg" alt="" draggable="false"
                                    class=" w-full h-full object-cover object-center rounded-2xl">
                            </div>

                            <div class=" col-span-2 flex flex-col justify-center pl-4">
                                <h4 class=" text-2xl font-bold text-white text-left capitalize mb-2">perantara fest</h4>
                                <div class=" flex items-center">
                                    <i class="fa fa-calendar text-sm text-white mr-2" aria-hidden="true"></i>
                                    <p class="text-white">06 Apr 2027</p>
                                </div>
                            </div>
                        </div>

                        <div class=" w-full h-full grid grid-cols-3 transition-all hover:scale-102 rounded-2xl">
                            <div class=" overflow-hidden">
                                <img src="./img/post/vf.jpeg" alt="" draggable="false"
                                    class=" w-full h-full object-cover object-center rounded-2xl">
                            </div>

                            <div class=" col-span-2 flex flex-col justify-center pl-4">
                                <h4 class=" text-2xl font-bold text-white text-left capitalize mb-2">veteran cup</h4>
                                <div class=" flex items-center">
                                    <i class="fa fa-calendar text-white text-sm mr-2" aria-hidden="true"></i>
                                    <p class="text-white">26 Apr 2027</p>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                <div class=" flex justify-start md:justify-center">
                    <div class=" flex flex-col items-start">
                        <h3 class=" text-3xl font-bold text-white text-left capitalize mb-5">contact info</h3>
                        <div class=" flex items-center text-lg font-normal text-white mb-2">
                            <i class="fa fa-thumb-tack mr-3" aria-hidden="true"></i>
                            <p class=" capitalize">address</p>
                        </div>
                        <div class=" flex items-center text-lg font-normal text-white mb-2">
                            <i class="fa fa-phone mr-3" aria-hidden="true"></i>
                            <p class="capitalize">+62883847294</p>
                        </div>
                        <div class=" flex items-center text-lg font-normal text-white mb-2">
                            <i class="fa fa-envelope mr-3" aria-hidden="true"></i>
                            <p class=" lowercase">vantage@gmail.com</p>
                        </div>
                        <div class=" flex items-center text-lg font-normal text-white mb-2">
                            <i class="fa fa-globe mr-3" aria-hidden="true"></i>
                            <p class=" lowercase">vantage.com</p>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    </footer>
</template>

<script>
export default {
    name: 'AppFooter'
}
</script>
