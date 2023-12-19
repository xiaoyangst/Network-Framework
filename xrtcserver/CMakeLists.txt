cmake_minimum_required(VERSION 3.16)

project(xrtcserver)

add_definitions("-g -pipe -W -Wall -fPIC -std=gnu++14 -DWEBRTC_POSIX
    -DWEBRTC_LINUX")

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/bin)

include_directories(src)
include_directories(third_party/include)
include_directories(../rtcbase/src)

link_directories(
        "./third_party/lib"
        "../rtcbase/out"
)

aux_source_directory(src SRC_LIST)
aux_source_directory(src/base SRC_BASE)

add_executable(xrtcserver ${SRC_LIST} ${SRC_BASE} main.cpp)

target_link_libraries(xrtcserver libyaml-cpp.a librtcbase.a -lpthread
        libabsl_strings.a libabsl_throw_delegate.a
)

