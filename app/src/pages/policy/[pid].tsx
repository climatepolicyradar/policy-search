import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import useGetPolicyPage from '../../hooks/useGetPolicyPage';
import useGetPolicies from '../../hooks/useGetPolicies';
import useSetStatus from '../../hooks/useSetStatus';
import MainLayout from '../../components/layouts/MainLayout';
import Button from '../../components/elements/buttons/Button';
import Head from 'next/head';
import Link from 'next/link';
import Loader from '../../components/Loader';
import { State } from '../../store/initialState';
import { wrapWords } from '../../helpers/textWrap';

const Policy = () => {
  const inputRef = useRef();
  const router = useRouter();
  const [ pageInput, setPageInput ] = useState('')
  const [ pageText, setPageText ] = useState('')
  const [ policyPage, getPage, clearPage ] = useGetPolicyPage();
  const [ policy, getPolicy ] = useGetPolicies();
  const [ status, setProcessing ] = useSetStatus();
  const { processing } = status;
  const { pid, page } = router.query;
  const state = useSelector((state: State ) => state)
  const { searchResult: { searchQuery } } = state;


  const loadPolicyPage = () => {
    setProcessing(true);
    getPolicy(pid);
    getPage(pid, page);
  }

  const changePageNumber = (action: string): void => {
    let p = parseInt(page);
    if(action === 'prev') {
      p -= 1;
    }
    if(action === 'next') {
      p += 1;
    }
    loadNewPage(p);
  }

  const handleInputChange = (): void => {
    let n = inputRef.current.value;
    if(n > policyPage.documentMetadata.pageCount) {
      n = policyPage.documentMetadata.pageCount;
    }
    setPageInput(n);
  }

  const handlePageChange = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    
    if(pageInput) {
      loadNewPage(pageInput)
    }
  }

  const loadNewPage = (page: number | string) => {
    router.push(`/policy/${pid}/?page=${page}`);
    setPageInput('');
  }

  // const highlightText = () => {
  //   const queryArr = searchQuery.split(' ');
  //   const pageTextArr = policyPage.pageText;

  //   arr.forEach((word) => {
  //     wrapWords(word, )
  //   })
  // }

  useEffect(() => {
    if(router.query.pid) {
      loadPolicyPage();
    }
  }, [router]);

  useEffect(() => {

  })

  return (
    <MainLayout>
      <Head>
        <title>Climate Policy Document: {policy.policyName}</title>
      </Head>
      {console.log(searchQuery)}
      <section>
        <div className="container">
          <div className="mb-4 flex justify-between items-end">
            <Link href='/'>
              <a className="text-gray-500 hover:text-black transition duration-300">
                &laquo; Back to search
              </a>
            </Link>
            <div>
              <form>
                Go to page:
                <input 
                  ref={inputRef}
                  type="number"
                  min="0"
                  max={`${policyPage.documentMetadata.pageCount}`}
                  onChange={handleInputChange}
                  value={pageInput}
                  style={{height: '36px', width: '40px'}}
                  className="border-b border-black outline-none focus:outline-none mx-2 appearance-none"
                />
                <Button size="small" onClick={handlePageChange}>Go</Button>
              </form>
            </div>

            <div>
            <button
              onClick={() => { changePageNumber('prev') }}
              className={`bg-black text-white px-4 py-2 rounded-l-lg border-r border-white focus:outline-black hover:bg-gray-700 transition duration-300 ${parseInt(page) === 0 ? 'pointer-events-none bg-gray-300 hover:bg-gray-300' : ''}`}
            >
              &laquo;
            </button>
            <button
              onClick={() => { changePageNumber('next') }}
              className={`bg-black text-white px-4 py-2 rounded-r-lg focus:outline-black hover:bg-gray-700 transition duration-300 ${parseInt(page) === policyPage.documentMetadata.pageCount ? 'pointer-events-none bg-gray-300 hover:bg-gray-300' : ''}`}
            >
              &raquo;
            </button>
              
            </div>
          </div>

          {processing ?
            <Loader />
          :
          <div className="bg-gray-100 rounded-2xl p-8 my-8">
            <h1 className="text-4xl leading-relaxed">{policy.policyName}</h1>
            <div className="my-4 text-gray-400 flex justify-between items-end">
              <a href={policy.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <span className="sr-only">Download PDF</span>
                <img src="/images/download-pdf.svg" alt="Download PDF" title="Download PDF" style={{ width: '40px'}} />
              </a>
              <div>
                Page <span className="text-black font-bold">{page}</span> of <span>{policyPage.documentMetadata.pageCount}</span>
              </div>
            </div>
            <div className="mt-6">
              {policyPage.pageText}
            </div>
          </div>
          }
          
          
        </div>
      </section>
      
    </MainLayout>
  )

}

export default Policy;