import Image from 'next/image'

function ForgotPassword() {
  return (
    <a
      href='/forgot-password'
      className='text-orange-500 hover:text-orange-400 text-xs transition-colors'
    >
      Forgot password?
    </a>
  )
}

const ARROW_CLIP = '[clip-path:polygon(0_0,90%_0,100%_50%,90%_100%,0_100%)]'

export default function Login() {
  return (
    <div className='relative h-screen w-screen'>
      <div className='absolute bottom-0 w-full h-full'>
        <Image
          src='/images/Login/bottom.png'
          alt='bottom'
          width={0}
          height={0}
          sizes='100vw'
          className='w-full h-full object-cover'
        />
      </div>
      <div className='absolute top-0 w-full h-[50%] -z-10'>
        <Image
          src='/images/Login/top.png'
          alt='top'
          width={0}
          height={0}
          sizes='100vw'
          className='w-full h-full object-cover object-bottom'
        />
      </div>

      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='bg-black/60 border border-white/10 rounded-2xl p-8 w-full max-w-sm shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_4px_12px_rgba(0,0,0,0.5),0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl'>
          <h2 className='text-white text-2xl font-bold text-center mb-6'>
            Welcome Back
          </h2>

          <div className='flex flex-col gap-4'>
            <div>
              <label className='block text-white text-sm mb-1'>Username</label>
              <input
                type='text'
                placeholder='Username'
                className='w-full bg-black/70 border border-gray-600 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors'
              />
            </div>

            <div>
              <div className='flex items-center justify-between mb-1'>
                <label className='block text-white text-sm'>Password</label>
                <ForgotPassword />
                {/* comment this line if this option not require okiee */}
              </div>
              <input
                type='password'
                placeholder='Enter Password'
                className='w-full bg-black/70 border border-gray-600 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors'
              />
            </div>

            <button
              type='submit'
              className='relative w-full overflow-hidden rounded-lg mt-2 cursor-pointer font-bold py-3 text-white uppercase tracking-widest text-sm bg-orange-500 border border-orange-500 group'
            >
              <span className='absolute inset-y-0 left-0 w-[110%] bg-orange-700 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out rounded-r-full' />
              <span className='relative z-10'>Login</span>
            </button>

            <div className='flex items-center gap-3'>
              <div className='flex-1 h-px bg-white/10' />
              <span className='text-gray-500 text-xs'>or</span>
              <div className='flex-1 h-px bg-white/10' />
            </div>

            <button
              type='button'
              className='relative w-full overflow-hidden flex items-center justify-center gap-3 border border-white/10 text-white font-medium py-3 rounded-lg cursor-pointer bg-white/5 group'
            >
              <span className='absolute inset-y-0 left-0 w-[110%] bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out rounded-r-full' />
              <Image
                src='/images/Login/google.png'
                alt='Google'
                width={20}
                height={20}
                className='object-contain invert relative z-10'
              />
              <span className='relative z-10'>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
