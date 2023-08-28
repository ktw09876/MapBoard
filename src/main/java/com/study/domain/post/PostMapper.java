package com.study.domain.post;

import com.study.common.dto.SearchDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper //XML Mapper의 SQL중 메서드명과 id가 동일한 쿼리를 실행, XML Mapper의 namespace라는 속성을 통해 연결된다
public interface PostMapper {

    /**
     * 게시글 저장
     *
     * @param params - 게시글 정보
     */
    void save(PostRequest params);

    /**
     * 게시글 상세정보 조회
     *
     * @param id - PK
     * @return 게시글 상세정보
     */
    PostResponse findById(Long id);

    /**
     * 게시글 수정
     *
     * @param params - 게시글 정보
     */
    void update(PostRequest params);

    /**
     * 게시글 삭제
     * 논리삭제(delete_yn = 1)
     * @param id - PK
     */
    void deleteById(Long id);

    /**
     * 게시글 리스트 조회
     *
     * @return 게시글 리스트
     */
    List<PostResponse> findAll(SearchDto params);

    /**
     * 게시글 수 카운팅
     *
     * @return 게시글 수
     */
    int count(SearchDto params);

}
